const express = require('express');
const router = express.Router();

const passport = require('passport');

const { Message } = require('../models/Message');

/**
 * @description GET /api/messages/:room_id
 */
router.get('/:room_id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const messages = await Message.find({ room: req.params.room_id });

    if (messages) {
        return res.status(200).json(messages);
    } else {
        return res.status(404).json({ error: 'No messages found' });
    }
});

module.exports = router;
