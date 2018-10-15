const express = require("express");
const router = express.Router();

const passport = require("passport");

const { User } = require("../models/User");

/**
 * @description  GET /users
 * @param  {Middleware} passport.authenticate
 * @param  {false} session
 * @param  {Object} request
 * @param  {Object} response
 * @access private
 */

router.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const users = await User.find({}, "image email username").exec();

    if (users) {
      return res
        .status(200)
        .json(users)
        .end();
    } else {
      return res.status(404).send({ error: "No Users Found" });
    }
  }
);

/**
 * @description GET/user/:session_id
 * @param  {String} id
 * @param  {Middleware} passport.authenticate
 * @param  {false} session
 * @param  {Object} request
 * @param  {Object} response
 */
router.get(
  "/:session_id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const user = await User.find(
      { session_id: req.params.session_id },
      "image email username"
    ).exec();

    if (user.length !== 0) {
      return res
        .status(200)
        .json(user)
        .end();
    } else {
      return res
        .status(404)
        .send({ error: `No User Found called ${req.params.username}` })
        .end();
    }
  }
);

module.exports = router;
