const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema(
    {
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
            ref: 'User'
        },
        admin: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: {
            createdAt: 'created_at'
        }
    }
);

const Message = mongoose.model('Message', MessageSchema);

module.exports = { Message };
