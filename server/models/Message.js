const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    content: {
        type: String,
        required: true,
        trim: true
    },
    room: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Room'
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    admin: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Message = mongoose.model('Message', MessageSchema);

module.exports = { Message };
