const express = require("express");
const router = express.Router();

const passport = require("passport");

const { User } = require("../models/User");

/**
 * @description GET/user/:username
 * @param  {String} id
 * @param  {Middleware} passport.authenticate
 * @param  {false} session
 * @param  {Object} request
 * @param  {Object} response
 */
router.get(
  "/:username",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const user = await User.find(
      { username: req.params.username },
      "image email username location"
    ).exec();

    if (user.length !== 0) {
      return res
        .status(200)
        .send({ user: user[0] })
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
