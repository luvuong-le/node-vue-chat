const express = require('express');
const router = express.Router();

const passport = require('passport');

const { Room } = require('../models/Room');

const { createErrorObject } = require('../middleware/authenticate');

/**
 * @description GET /api/rooms
 */
router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const rooms = await Room.find({}).exec();

    if (rooms) {
        return res.status(200).json(rooms);
    } else {
        return res.status(404).json({ error: 'No Rooms Found' });
    }
});

/**
 * @description POST /api/room
 */
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let errors = [];

    const room = await Room.findOne({ name: req.body.room_name }).exec();
    if (room) {
        if (room.name === req.body.room_name) {
            errors.push({ param: 'room_taken', msg: 'Roomname already taken' });
        }
        return res.json({ errors: createErrorObject(errors) });
    } else {
        const newRoom = new Room({
            name: req.body.room_name,
            user: req.user.id,
            password: req.body.password
        });

        newRoom
            .save()
            .then(room => {
                return res.status(200).json(room);
            })
            .catch(err => {
                return res.json(err);
            });
    }
});

/**
 * @description GET /api/room/:room_name
 */
router.get('/:room_name', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const room = await Room.findOne({ name: req.params.room_name }).exec();

    if (room) {
        return res.status(200).json(room);
    } else {
        return res.status(404).json({ error: `No room with name ${req.params.room_name} found` });
    }
});

/**
 * @description DELETE /api/room/:room_name
 */

/**
 * @description PUT /api/room/:room_name
 */
module.exports = router;
