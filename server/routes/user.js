const express = require("express");
const router = express.Router();

const passport = require("passport");

const { User } = require("../models/User");

/**
 * @description  GET /users
 * @param  {} passport.authenticate
 * @param  {false} session
 * @param  {} request
 * @param  {} response
 * @access private
 */

router.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const users = await User.find({}).exec();

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

module.exports = router;
