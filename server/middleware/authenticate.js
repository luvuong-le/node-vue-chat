const passport = require('passport');
const { User } = require('../models/User');

const createErrorObject = errors => {
    const errorObject = [];
    errors.forEach(error => {
        let err = {
            [error.param]: error.msg
        };
        errorObject.push(err);
    });

    return errorObject;
};

const checkRegistrationFields = async (req, res, next) => {
    req.check('email').isEmail();
    req.check('username')
        .isString()
        .isLength({ min: 5, max: 15 })
        .withMessage('Username must be between 5 and 15 characters');
    req.check('password')
        .isString()
        .isLength({ min: 5, max: 15 })
        .withMessage('Password must be between 5 and 15 characters');

    let errors = req.validationErrors() || [];

    const user = await User.findOne({ username: req.body.username });

    if (user) {
        errors.push({ param: 'username', msg: 'Username already taken' });
    }

    if (errors.length > 0) {
        res.send({
            errors: createErrorObject(errors)
        });
    } else {
        next();
    }
};

const checkLoginFields = async (req, res, next) => {
    let errors = [];
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        errors.push({ param: 'email', msg: 'Invalid Details Entered' });
    } else {
        if (req.body.password !== null && !(await user.isValidPassword(req.body.password))) {
            errors.push({ param: 'password', msg: 'Invalid Details Entered' });
        }
    }

    if (errors.length !== 0) {
        res.send({
            errors: createErrorObject(errors)
        });
    } else {
        next();
    }
};

const checkEditProfileFields = async (req, res, next) => {
    let errors = [];

    if (req.body.email) {
        if (await User.findOne({ email: req.body.email })) {
            errors.push({ param: 'email', msg: 'Email is already taken' });
        }
    }

    if (req.body.handle) {
        if (await User.findOne({ handle: req.body.handle })) {
            errors.push({ param: 'handle', msg: 'Handle is already taken' });
        }
    }
    if (errors.length !== 0) {
        res.send({
            errors: createErrorObject(errors)
        });
    } else {
        next();
    }
};

const checkCreateRoomFields = async (req, res, next) => {
    if (!req.body.room_name) {
        req.check('room_name')
            .not()
            .isEmpty()
            .withMessage('Room name is required');
    } else {
        req.check('room_name')
            .isString()
            .isLength({ min: 3, max: 20 })
            .withMessage('Room name must be between 5 and 20 characters');
    }

    if (req.body.password) {
        req.check('password')
            .not()
            .isEmpty()
            .isLength({ min: 5, max: 15 })
            .withMessage('Password should be between 5 and 15 characters');
    }

    const errors = req.validationErrors();

    if (errors) {
        res.send({
            errors: createErrorObject(errors)
        });
    } else {
        next();
    }
};

const customSocialAuthenticate = socialAuth => {
    return (req, res, next) => {
        passport.authenticate(socialAuth, {
            state: JSON.stringify({ _socket: req.query.socketId })
        })(req, res, next);
    };
};

module.exports = {
    checkLoginFields,
    checkRegistrationFields,
    checkEditProfileFields,
    checkCreateRoomFields,
    customSocialAuthenticate,
    createErrorObject
};
