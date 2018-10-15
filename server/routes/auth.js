const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const { User } = require("../models/User");

/** Authentication */
const {
  checkRegistrationFields,
  checkLoginFields,
  createErrorObject
} = require("../middleware/authenticate");

/** JWT */
const jwt = require("jsonwebtoken");

/**
 * @description  POST /register
 * @param  {} [checkRegistrationFields]
 * @param  {} request
 * @param  {} response
 * @access public
 */
router.post("/register", [checkRegistrationFields], (req, res) => {
  let errors = [];

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.push({ param: "email", msg: "Email is already taken" });

      if (user.username === req.body.username) {
        errors.push({ param: "username", msg: "Username is already taken" });

        res
          .send({
            errors: createErrorObject(errors)
          })
          .end();
      }
    } else {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        session_id: uuid.v1()
      });

      newUser
        .save()
        .then(user => {
          const token = jwt.sign({ user }, process.env.JWT_SECRET, {
            expiresIn: 84000
          });

          res.status(200).send({ auth: true, token, user });
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

/**
 * @description POST /login
 * @param  {} checkLoginFields
 * @param  {} request
 * @param  {} response
 * @access public
 */
router.post("/login", checkLoginFields, async (req, res) => {
  await User.updateOne(
    { email: req.body.email },
    { $set: { session_id: uuid.v1() } }
  );

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).send({
      error: "No User Found"
    });
  }

  const token = jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: 3600
  });

  res.status(200).send({ auth: true, token, user });
});

module.exports = router;
