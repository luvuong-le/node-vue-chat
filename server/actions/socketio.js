const { Message } = require('../models/Message');
const { Room } = require('../models/Room');

module.exports = {
    ADD_MESSAGE: async data => {
        const newMessage = await new Message({
            content: data.content,
            admin: data.admin ? true : false,
            user: data.user._id,
            room: data.room._id
        }).save();

        return Message.populate(newMessage, {
            path: 'user',
            select: 'username social handle image'
        });
    },
    GET_MESSAGES: async data => {
        return await Message.find({ room: data.room._id }).populate('user', [
            'username',
            'social',
            'handle',
            'image'
        ]);
    },
    GET_ROOMS: async () => {
        return await Room.find({})
            .populate('user users', ['username', 'social', 'handle', 'image'])
            .select('-password');
    },
    UPDATE_ROOM_USERS: async data => {
        const room = await Room.findOne({ name: data.room.name })
            .select('-password')
            .populate('users', ['username']);
        if (room) {
            if (room.users && !room.users.find(user => user._id.toString() === data.user._id)) {
                room.users.push(data.user._id);
                const updatedRoom = await room.save();
                return Room.populate(updatedRoom, {
                    path: 'user users',
                    select: 'username social image handle'
                });
            } else {
                return Room.populate(room, {
                    path: 'user users',
                    select: 'username social image handle'
                });
            }
        } else {
            return;
        }
    }
};
