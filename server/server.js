require("dotenv").config();

/** Connect to MongoDB */
const { mongoose } = require("./db/mongoose");

/** Built In Node Dependencies */
const path = require("path");

/** Logging Dependencies */
const morgan = require("morgan");
const winston = require("winston");

/** Passport Configuration */
const passport = require("passport");
require("./config/passport")(passport);

/** Routes */
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

/** Express */
const express = require("express");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");

const app = express();

/** Serve Static Files */
app.use(express.static(path.join(__dirname, "../public")));

/** Middleware */
app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(expressValidator());

/** Routes Definitions */
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

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

const server = app.listen(process.env.PORT || 5000, () => {
  console.log(`[LOG=SERVER] Server started on port ${process.env.PORT}`);
});

server.on("close", async () => {
  await mongoose.disconnect();
});

module.exports = { app, server };
