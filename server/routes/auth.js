const _ = require('lodash');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { User } = require('../models/User');
const gravatar = require('gravatar');
const socialAuthActions = require('../actions/socialAuthActions');

/** Middleware */
const {
    checkRegistrationFields,
    checkLoginFields,
    createErrorObject,
    customSocialAuthenticate
} = require('../middleware/authenticate');

/**
 * @description  POST /register
 * @param  {} [checkRegistrationFields]
 * @param  {} request
 * @param  {} response
 * @access public
 */
router.post('/register', [checkRegistrationFields], (req, res) => {
    let errors = [];

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            errors.push({ param: 'email', msg: 'Email is already taken' });

            if (user.username === req.body.username) {
                errors.push({ param: 'username', msg: 'Username is already taken' });
            }

            res.send({
                errors: createErrorObject(errors)
            }).end();
        } else {
            /** Assign Gravatar */
            const avatar = gravatar.url(req.body.email, {
                s: '220',
                r: 'pg',
                d: 'identicon'
            });

            const newUser = new User({
                handle: req.body.handle,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                image: avatar
            });

            newUser
                .save()
                .then(userData => {
                    const user = _.omit(userData.toObject(), ['password']);

                    const token = jwt.sign(user, process.env.JWT_SECRET, {
                        expiresIn: 18000
                    });

                    res.status(200).send({
                        auth: true,
                        token: `Bearer ${token}`,
                        user
                    });
                })
                .catch(err => {
                    res.send({
                        err,
                        error: 'Something went wrong, Please check the fields again'
                    });
                });
        }
    });
});

/**
 * @description POST /login
 * @param  {} checkLoginFields
 * @param  {} request
 * @param  {} response
 * @access public
 */
router.post('/login', checkLoginFields, async (req, res) => {
    const user = await User.findOne({ email: req.body.email }).select('-password');

    if (!user) {
        return res.status(404).send({
            error: 'No User Found'
        });
    }

    const token = jwt.sign(user.toObject(), process.env.JWT_SECRET, { expiresIn: 18000 });

    res.status(200).send({ auth: true, token: `Bearer ${token}`, user });
});

/**
 * @description POST /logout
 * @param  {} request
 * @param  {} response
 * @access public
 */
router.post('/logout', async (req, res) => {
    const user = await User.findOne({ username: req.body.username }).select('-password');

    if (!user) {
        return res.status(404).send({
            error: 'No User Found'
        });
    }

    res.status(200).send({ success: true });
});

/** Social Auth Routes */
router.get('/google', customSocialAuthenticate('google'));
router.get('/facebook', customSocialAuthenticate('facebook'));

/** Social Auth Callbacks */
router.get('/google/redirect', passport.authenticate('google'), socialAuthActions.google);
router.get('/facebook/redirect', passport.authenticate('facebook'), socialAuthActions.facebook);

module.exports = router;
