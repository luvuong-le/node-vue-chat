const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const RoomSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            minlength: ['3', 'Room name should be greater than 3 characters'],
            maxlength: ['20', 'Room name should be less than 20 characters']
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            default: null
        },
        password: {
            type: String,
            default: ''
        },
        access: {
            type: Boolean,
            default: true
        },
        accessIds: {
            type: Array,
            default: []
        },
        users: [
            {
                _id: false,
                lookup: {
                    type: Schema.Types.ObjectId,
                    required: true,
                    ref: 'User'
                },
                socketId: {
                    type: String,
                    required: true
                }
            }
        ]
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);

RoomSchema.methods.isValidPassword = function(password) {
    return bcrypt.compare(password, this.password);
};

RoomSchema.pre('save', function(next) {
    if (this.password !== '' && this.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(this.password, salt, (err, res) => {
                this.password = res;
                next();
            });
        });
    } else {
        next();
    }
});

const Room = mongoose.model('Room', RoomSchema);

module.exports = { Room };
