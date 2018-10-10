const express = require("express");
const router = express.Router();

/** Models */
const { User } = require("../models/User");

/** Authentication */
const {
  isLoggedIn,
  checkRegistrationFields
} = require("../middleware/authenticate");
const passport = require("passport");

router.post("/register", [isLoggedIn, checkRegistrationFields], (req, res) => {
  // Check MongoDB for already existing User
  // If no existing user, create a new one

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      res.send({ errors: "Email is already taken" }).end();
    } else {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      });

      newUser
        .save()
        .then(user => {
          req.logIn(user => {
            res.send({
              user,
              success: "Logged In Succesfully"
            });
          });
        })
        .catch(err => {
          res.send({
            err,
            error: "Something went wrong, Please check the fields again"
          });
        });
    }
  });
});

router.post(
  "/login",
  passport.authenticate("local-login", {
    failureRedirect: "/",
    failureFlash: true
  }),
  (req, res) => {
    // Authentication Successful
    res.send("Successfully Logged In");
  }
);

module.exports = router;
