const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const { User } = require("../models/User");

let opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

module.exports = function(passport) {
  passport.use(
    new JwtStrategy(opts, (payload, done) => {
      User.findById(payload.user._id).then(user => {
        if (user && user.password === payload.user.password) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    })
  );
};
