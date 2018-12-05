const express = require('express');
const router = express.Router();

const passport = require('passport');

const { User } = require('../models/User');

/**
 * @description GET/user/:username
 * @param  {String} id
 * @param  {Middleware} passport.authenticate
 * @param  {false} session
 * @param  {Object} request
 * @param  {Object} response
 */
router.get('/:username', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const user = await User.find(
        { username: req.params.username },
    ).select('-password -session_id').exec();

    if (user) {
        return res
            .status(200)
            .json(user[0])
            .end();
    } else {
        return res
            .status(404)
            .json({ error: `No User Found called ${req.params.username}` })
            .end();
    }
});

module.exports = router;
