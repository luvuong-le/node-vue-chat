const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../models/User");

module.exports = function(passport) {
  // Session Setup
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // Login Strategy
  passport.use(
    "local-login",
    new LocalStrategy(
      {
        passReqToCallback: true
      },
      function(req, username, password, done) {
        // Find a user in the database and compare it with the email and password
        User.findOne({ username }).then(user => {
          // Compare passwords
          if (user) {
            user.isValidPassword(password).then(res => {
              if (res) {
                return done(null, user);
              } else {
                return done(null, false, { message: "Incorrect Password" });
              }
            });
          } else {
            return done(null, false, {
              message: "Unable to find user with specified username & password"
            });
          }
        });
      }
    )
  );
};
