const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect(
  process.env.DATABASE_URL,
  { useNewUrlParser: true, useCreateIndex: true },
  err => {
    if (err) return;

    console.log("[LOG=DB] Successfully connected to MongoDB");
  }
);

module.exports = { mongoose };
