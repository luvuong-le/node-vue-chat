require("dotenv").config();

/** Built In Node Dependencies */
const path = require("path");

/** Logging Dependencies */
const morgan = require("morgan");
const winston = require("winston");

/** Connect to MongoDB */
const { mongoose } = require("./db/mongoose");

/** Passport Configuration */
const passport = require("passport");
require("./config/passport")(passport);

/** Routes */
const apiRoutes = require("./routes/api");

/** Other */
const uuidv4 = require("uuid/v4");

/** Express */
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const expressValidator = require("express-validator");

const app = express();
const port = 5000;

/** Serve Static Files */
app.use(express.static(path.join(__dirname, "../public")));

/** Middleware */
app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  session({
    genid: function() {
      return uuidv4(); // use UUIDs for session IDs
    },
    resave: false,
    saveUninitialized: true,
    cookie: {
      // Secure: true you must be on a https
      secure: false
    },
    secret: process.env.EXPRESS_SESSION_KEY
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(expressValidator());
app.use("/api", apiRoutes);

/** Logging Configurations */
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/info.log" })
  ]
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  );
}

app.listen(port, () => {
  console.log(`[LOG=SERVER] Server started on port ${port}`);
});
