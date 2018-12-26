const _ = require('lodash');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { User } = require('../models/User');
const { GOOGLE_CONFIG, FACEBOOK_CONFIG } = require('../config/config');
const { createAvatar } = require('../actions/tinygraph');
const socialAuthActions = require('../actions/socialAuthActions');

/** Middleware */
const {
    checkRegistrationFields,
    checkLoginFields,
    createErrorObject
} = require('../middleware/authenticate');

const addSocketIdtoSession = (req, res, next) => {
    req.session.socketId = req.query.socketId;
    next();
};

/** Social Passport Auth */
const googleAuth = passport.authenticate('google', GOOGLE_CONFIG.options);
const facebookAuth = passport.authenticate('facebook');

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
            const newUser = new User({
                handle: req.body.handle,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                image: createAvatar(req.body.username)
            });

            console.log(newUser);

            newUser
                .save()
                .then(userData => {
                    const user = _.omit(userData.toObject(), ['password']);

                    const token = jwt.sign(user, process.env.JWT_SECRET, {
                        expiresIn: 86400
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

    const token = jwt.sign(user.toObject(), process.env.JWT_SECRET, { expiresIn: 86400 });

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
router.get('/google', addSocketIdtoSession, googleAuth);
router.get('/facebook', addSocketIdtoSession, facebookAuth);

/** Social Auth Callbacks */
router.get(
    '/google/redirect',
    passport.authenticate('google', { failureRedirect: '/api/auth/google' }),
    socialAuthActions.google
);
router.get('/facebook/redirect', facebookAuth, socialAuthActions.facebook);

module.exports = router;
