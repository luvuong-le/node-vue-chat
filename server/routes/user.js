const express = require('express');
const router = express.Router();

const passport = require('passport');

const { User } = require('../models/User');

/**
 * @description  GET /api/user/users
 * @param  {Middleware} passport.authenticate
 * @param  {false} session
 * @param  {Object} request
 * @param  {Object} response
 * @access private
 */

router.get('/users', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const users = await User.find({}, 'image email username location').exec();

    if (users) {
        return res
            .status(200)
            .json(users)
            .end();
    } else {
        return res.status(404).json({ error: 'No Users Found' });
    }
});

/**
 * @description PUT /api/user/current
 * @param  {String} id
 * @param  {Middleware} passport.authenticate
 * @param  {false} session
 * @param  {Object} request
 * @param  {Object} response
 */
router.put('/current', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await User.findOneAndUpdate(
        { _id: req.user.id },
        req.body,
        { fields: { handle: 1, email: 1, location: 1 } },
        (err, doc) => {
            if (err) return res.send(500, { error: err });

            return res.json({
                success: true,
                user: doc
            });
        }
    );
});

/**
 * @description GET api/user/current
 * @param  {String} id
 * @param  {Middleware} passport.authenticate
 * @param  {false} session
 * @param  {Object} request
 * @param  {Object} response
 */
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json(req.user);
});

/**
 * @description DELETE api/user/current
 * @param  {String} id
 * @param  {Middleware} passport.authenticate
 * @param  {false} session
 * @param  {Object} request
 * @param  {Object} response
 */
router.delete('/current', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await User.findOneAndDelete({ _id: req.user.id });

    res.json({ success: true });
});

module.exports = router;
