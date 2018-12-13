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
const { ADD_MESSAGE, GET_MESSAGES } = require('./actions/socketio');

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

    /** Join User in Room */
    socket.on('userJoined', data => {
        socket.join(data.room._id, async () => {
            console.log('New user joining');

            // Store Admin message in database
            // ADD_MESSAGE(data);

            // Get list of messages to send back to client
            io.to(data.room._id).emit('receivedNewUser', JSON.stringify(await GET_MESSAGES(data)));
        });
    });

    /** User Exit Room */
    socket.on('exitRoom', data => {
        socket.leave(data.room._id, async () => {
            console.log('User Exiting Room');

            // Store Admin message in database
            // ADD_MESSAGE(data);

            // Send back to user
            io.to(data.room._id).emit(
                'receivedMessage',
                JSON.stringify({
                    data
                })
            );

            io.to(data.room._id).emit('receivedUserExit', data.room);
        });
    });

    /** New Message Event */
    socket.on('newMessage', async data => {
        console.log('Sending new message', data.content);

        const newMessage = await ADD_MESSAGE(data);

        // Emit data back to the client for display
        io.to(data.room._id).emit('receivedNewMessage', JSON.stringify(newMessage));
    });

    /** Room Deleted Event */
    socket.on('roomDeleted', async data => {
        io.to(data.room._id).emit('receivedNewMessage', JSON.stringify(data));
        io.to(data.room._id).emit('roomDeleted', JSON.stringify(data));
        io.emit('roomListUpdated', JSON.stringify(data));
    });

    /** Room Added Event */
    socket.on('roomAdded', async data => {
        io.emit('roomAdded', JSON.stringify(data));
    });

    /** Room Updated Event */
    socket.on('roomUpdateEvent', async data => {
        io.in(data.room._id).emit('roomUpdated', JSON.stringify(data));
        io.emit('roomNameUpdated', JSON.stringify(data));
    });
});

if (process.env.NODE_ENV !== 'test') {
    server.listen(process.env.PORT || 5000, () => {
        logger.info(`[LOG=SERVER] Server started on port ${process.env.PORT}`);
    });
}

module.exports = { app };
