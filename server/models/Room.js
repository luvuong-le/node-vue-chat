const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        maxlength: ['20', 'Room name should be less than 20 characters']
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    password: {
        type: String,
        default: null
    },
    users: {
        type: Array,
        default: []
    }
});

const Room = mongoose.model('Room', RoomSchema);

module.exports = { Room };
