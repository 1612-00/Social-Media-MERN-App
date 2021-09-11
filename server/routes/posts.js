const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const Post = require("../models/Post");

// Create post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (req.body.userId === post.userId) {
      await Post.findOneAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Update your post success");
    } else {
      res.status(403).json("You can update your post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (req.body.userId === post.userId) {
      await Post.findOneAndDelete(req.params.id);
      res.status(200).json("Delete your post success");
    } else {
      res.status(403).json("You can delete your post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// Like post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.like.includes(req.body.userId)) {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { like: req.body.userId } }
      );
      res.status(200).json("Liked this post");
    } else {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { like: req.body.userId } }
      );
      res.status(200).json("Disliked this post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get a post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get timeline posts
router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPost = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPost.concat(...friendPosts));
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get user's all posts
router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
});

module.exports = router;
