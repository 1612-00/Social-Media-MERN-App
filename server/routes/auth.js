const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      profilePicture: req.body.profilePicture,
      coverPicture: req.body.coverPicture,
      followers: req.body.followers,
      followings: req.body.followings,
      isAdmin: req.body.isAdmin,
      desc: req.body.desc,
      city: req.body.city,
      from: req.body.from,
      relationship: req.body.relationship,
    });

    // Save user and response
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) res.status(404).json("user not found");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) res.status(400).json("wrong password");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
