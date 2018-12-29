const jwt = require('jsonwebtoken');

module.exports = {
    google: (req, res) => {
        const io = req.app.get('io');
        const token = jwt.sign(req.user.details.toObject(), process.env.JWT_SECRET, {
            expiresIn: 18000
        });
        io.to(req.user._socket).emit(
            'google',
            JSON.stringify({
                auth: true,
                token: `Bearer ${token}`,
                user: req.user.details
            })
        );
    },
    facebook: (req, res) => {
        const io = req.app.get('io');
        const token = jwt.sign(req.user.details.toObject(), process.env.JWT_SECRET, {
            expiresIn: 18000
        });
        io.to(req.user._socket).emit(
            'facebook',
            JSON.stringify({
                auth: true,
                token: `Bearer ${token}`,
                user: req.user.details
            })
        );
    }
};
