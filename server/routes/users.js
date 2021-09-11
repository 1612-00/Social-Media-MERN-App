const router = require("express").Router();
const bcrypt = require("bcrypt");
const { Model } = require("mongoose");
const User = require("../models/User");

// UPDATE USER
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (error) {
        return res.status(500).json(error);
      }
    }
    try {
      const user = await User.findOneAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json("You can update only your account!");
  }
});

// DELETE USER
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
});

// GET A USER
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (error) {
    res.status(500).json(err);
  }
});

// GET FRIENDS
router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });

    res.status(200).json(friendList);
  } catch (error) {
    res.status(500).json(error);
  }
});

// FOLLOW A USER
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      // Follow this - Nguoi duoc theo doi
      const currentUser = await User.findById(req.params.id);
      // People followed - Nguoi di theo doi
      const user = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await User.findOneAndUpdate(
          { _id: req.params.id },
          { $push: { followers: req.body.userId } }
        );
        await User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { followings: req.params.id } }
        );
        res.status(200).json("Follower successful");
      } else {
        res.status(403).json("You already follow this user");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You don't follow this people");
  }
});

// UN FOLLOW A USER
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await User.findOneAndUpdate(
          { _id: req.params.id },
          { $pull: { followings: req.body.userId } }
        );
        await User.findOneAndUpdate(
          { _id: req.body.userId },
          { $pull: { followers: req.params.id } }
        );
        res.status(200).json("UnFollower successful");
      } else {
        res.status(403).json("You already un follow this user");
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You don't un follow this people");
  }
});

module.exports = router;
