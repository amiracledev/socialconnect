const express = require("express");
const router = express.Router();

//Load User Model
const User = require("../../models/User");

//@routes   GET api/users/test
//@desc     Tests Users route
//@access   Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

//@routes   GET api/users/register
//@desc     Register user
//@access   Public
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "email already exist" });
    }
  });
});

module.exports = router;
