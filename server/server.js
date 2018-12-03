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

/** Express */
const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cors = require('cors');

const app = express();

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

if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new winston.transports.Console({
            format: winston.format.simple()
        })
    );
}

if (process.env.NODE_ENV !== 'test') {
    app.listen(process.env.PORT || 5000, () => {
        logger.info(`[LOG=SERVER] Server started on port ${process.env.PORT}`);
    });
}

module.exports = { app };
