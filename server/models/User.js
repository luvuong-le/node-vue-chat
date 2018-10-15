const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    maxlength: ["15", "Username should be less than 15 characters"]
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    minlength: ["5", "Password should be greater than 5 characters"],
    maxlength: ["20", "Password should be less than 20 characters"],
    required: true
  },
  image: {
    type: String,
    default: null
  },
  session_id: {
    type: String,
    default: null
  }
});

UserSchema.methods.isValidPassword = function(password) {
  return bcrypt.compare(password, this.password);
};

// Before Saving hash the password with bcrypt, using the default 10 rounds for salt
UserSchema.pre("save", function(next) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(this.password, salt, (err, res) => {
      this.password = res;
      next();
    });
  });
});

let User = mongoose.model("Users", UserSchema);

module.exports = { User };
