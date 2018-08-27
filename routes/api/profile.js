const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Profile Model
const Profile = require("../../models/Profile");
//User Profile Model
const User = require("../../models/User");

//@routes   GET api/Profile/test
//@desc     Tests Profile route
//@access   Public
router.get("/test", (req, res) => res.json({ msg: "Profile Works" }));

//@routes   GET api/Profile/
//@desc     Getting current users profile
//@access   Private

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    console.log("testingo 888888");

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;