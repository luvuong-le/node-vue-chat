const { Message } = require('../models/Message');

module.exports = {
    ADD_MESSAGE: async data => {
        const newMessage = await new Message({
            content: data.content,
            admin: data.admin ? true : false,
            user: data.user._id,
            room: data.room._id
        }).save();

        return Message.populate(newMessage, { path: 'user', select: 'username' });
    },
    GET_MESSAGES: async data => {
        return await Message.find({ room: data.room._id }).populate('user', ['username']);
    }
};
