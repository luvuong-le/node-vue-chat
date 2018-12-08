/** Dotenv Environment Variables */
require('dotenv').config();

/** Connect to MongoDB */
require('./db/mongoose');

/** Built In Node Dependencies */
const path = require('path');

/** Logging Dependencies */
const morgan = require('morgan');
const winston = require('winston');
const { logger } = require('./config/logModule');

/** Passport Configuration */
const passport = require('passport');
require('./config/passport')(passport);

/** Routes */
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const profileRoutes = require('./routes/profile');
const roomRoutes = require('./routes/room');
const messageRoutes = require('./routes/messages');

/** Express */
const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cors = require('cors');

/** Socket IO */
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

/** Serve Static Files */
app.use(express.static(path.join(__dirname, '../public')));

/** Middleware */
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(expressValidator());
app.use(cors());

/** Routes Definitions */
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/room', roomRoutes);
app.use('/api/messages', messageRoutes);

if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new winston.transports.Console({
            format: winston.format.simple()
        })
    );
}

/** Socket IO Connections */
io.on('connection', socket => {
    logger.info('[SOCKET-IO] User Connected');

    /** Socket Events */
    socket.on('disconnect', () => {
        logger.info('User Disconnected');
        io.emit('User Disconnected');
    });

    socket.on('userJoined', data => {
        /** Join User in Room */
        socket.join(data.room.name, () => {
            console.log('Emitting new message');

            // Store Admin message in database
            // Emit data back to the client
            io.to(data.room.name).emit('receivedMessage', data.user.username);
        });
    });
});

if (process.env.NODE_ENV !== 'test') {
    server.listen(process.env.PORT || 5000, () => {
        logger.info(`[LOG=SERVER] Server started on port ${process.env.PORT}`);
    });
}

module.exports = { app };
