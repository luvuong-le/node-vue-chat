const jwt = require('jsonwebtoken');

module.exports = {
    google: (req, res) => {
        const io = req.app.get('io');
        const token = jwt.sign(req.user.toObject(), process.env.JWT_SECRET, {
            expiresIn: 86400
        });
        io.to(req.session.socketId).emit(
            'google',
            JSON.stringify({
                auth: true,
                token: `Bearer ${token}`,
                user: req.user
            })
        );
    },
    facebook: (req, res) => {
        const io = req.app.get('io');
        const token = jwt.sign(req.user.toObject(), process.env.JWT_SECRET, {
            expiresIn: 86400
        });
        io.to(req.session.socketId).emit(
            'facebook',
            JSON.stringify({
                auth: true,
                token: `Bearer ${token}`,
                user: req.user
            })
        );
    }
};
