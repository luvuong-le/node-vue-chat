const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        handle: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            maxlength: ['15', 'Username should be less than 15 characters']
        },
        social: {
            id: {
                type: String,
                default: null
            },
            image: {
                type: String,
                default: null
            },
            email: {
                type: String,
                default: null
            }
        },
        email: {
            type: String,
            trim: true,
            unique: true,
            default: null
        },
        password: {
            type: String,
            minlength: ['5', 'Password should be greater than 5 characters'],
            maxlength: ['20', 'Password should be less than 20 characters'],
            default: null
        },
        image: {
            type: String,
            default: null
        },
        location: {
            type: String,
            default: null
        }
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);

UserSchema.methods.isValidPassword = function(password) {
    return bcrypt.compare(password, this.password);
};

// Before Saving hash the password with bcrypt, using the default 10 rounds for salt
UserSchema.pre('save', function(next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, res) => {
            this.password = res;
            next();
        });
    });
});

const User = mongoose.model('User', UserSchema);

module.exports = { User };
