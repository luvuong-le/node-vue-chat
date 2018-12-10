const express = require('express');
const router = express.Router();

const passport = require('passport');

const { Message } = require('../models/Message');

const { createErrorObject } = require('../middleware/authenticate');

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

/**
 * @description POST /api/messages/
 */
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let errors = [];

    if (!req.body.content) {
        errors.push({ param: 'no_content', msg: 'Message cannot be empty' });
        return res.json({ errors: createErrorObject(errors) });
    }

    const newMessage = new Message({
        content: req.body.content,
        admin: req.body.admin ? true : false,
        user: req.user.id,
        room: req.body.roomId
    }).save();

    return res.status(200).json(newMessage);
});

module.exports = router;
