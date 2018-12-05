const express = require('express');
const router = express.Router();

const passport = require('passport');

const { Room } = require('../models/Room');

const { createErrorObject, checkCreateRoomFields } = require('../middleware/authenticate');

/**
 * @description GET /api/rooms
 */
router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const rooms = await Room.find({}).populate('user', ['username']).exec();

    if (rooms) {
        return res.status(200).json(rooms);
    } else {
        return res.status(404).json({ error: 'No Rooms Found' });
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
 * @description POST /api/room
 */
router.post('/', [passport.authenticate('jwt', { session: false }), checkCreateRoomFields], async (req, res) => {
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
            access: req.body.password ? false : true,
            password: req.body.password
        });

        newRoom
            .save()
            .then(room => {
                Room.populate(room, { path: "user", select: 'username'}, (err, room) => {
                    if (err) {
                        console.log(err);
                    }
                    return res.status(200).json(room);
                })
                
            })
            .catch(err => {
                return res.json(err);
            });
    }
});


/**
 * @description DELETE /api/room/:room_name
 */
router.delete('/:room_name', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const room = await Room.findOneAndDelete({ name: req.params.room_name }).select('-password').lean();
        
        if (room) {
            return res.status(200).json(room);
        } else {
            return res
                .status(404)
                .json({ errors: `No room with name ${req.params.room_name} found` });
        }
        
    } catch (err) {
        return res.status(404).json(err);
    }

});

/**
 * @description PUT /api/room/update
 */
router.post('/update', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const room = await Room.findOneAndUpdate({ name: req.body.room_name }, { name: req.body.new_room_name }, { fields: { "password": 0}, new: true });

    if (room) {
            return res.status(200).json(room);
    } else {
        return res
            .status(404)
            .json({ errors: `No room with name ${req.params.room_name} found` }); 
    }
});

module.exports = router;
