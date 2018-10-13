const mongoose = require("mongoose");
const { logger } = require("../config/logModule");

mongoose.Promise = global.Promise;

mongoose.connect(
  process.env.DATABASE_URL,
  { useNewUrlParser: true, useCreateIndex: true },
  err => {
    if (err) {
      logger.error(err);
      return;
    }

    if (process.env.NODE_ENV !== "test") {
      logger.info("[LOG=DB] Successfully connected to MongoDB");
    }
  }
);

module.exports = { mongoose };
