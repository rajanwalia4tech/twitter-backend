import Tweet from "../models/tweets.model.js";
import Like from "../models/likes.model.js";
import Comment from "../models/comments.model.js";

// Create a new tweet
const createTweetController = async (req, res) => {
  try {
    const { content } = req.body;
    const newTweet = await Tweet.create({ content, userId: req.user.data });

    res.status(201).json({
      message: "Tweet created successfully",
      tweet: newTweet,
    });
  } catch (error) {
    console.error("Error creating tweet: ", error);
    res
      .status(500)
      .json({ message: "Error creating tweet", error: error.message });
  }
};

// Fetch user's tweets
const getUserTweetsController = async (req, res) => {
  try {
    const userId = req.params.userId;
    const tweets = await Tweet.find({ userId }).populate(
      "userId",
      "name email"
    );

    res.status(200).json({
      message: "Tweets retrieved successfully",
      tweets,
    });
  } catch (error) {
    console.error("Error fetching tweets: ", error);
    res
      .status(500)
      .json({ message: "Error fetching tweets", error: error.message });
  }
};

// Edit an existing tweet
const editTweetController = async (req, res) => {
  try {
    const { tweetId, newContent } = req.body;
    const updatedTweet = await Tweet.findOneAndUpdate(
      { _id: tweetId, userId: req.user.data },
      { content: newContent },
      { new: true, runValidators: true }
    );

    if (!updatedTweet) {
      return res
        .status(404)
        .json({ message: "Tweet not found or not authorized" });
    }

    res.status(200).json({
      message: "Tweet updated successfully",
      tweet: updatedTweet,
    });
  } catch (error) {
    console.error("Error updating tweet: ", error);
    res
      .status(500)
      .json({ message: "Error updating tweet", error: error.message });
  }
};

// Delete a tweet
const deleteTweetController = async (req, res) => {
  try {
    const tweetId = req.body.tweetId;
    const deletedTweet = await Tweet.findOneAndDelete({
      _id: tweetId,
      userId: req.user.data,
    });

    if (!deletedTweet) {
      return res
        .status(404)
        .json({ message: "Tweet not found or not authorized" });
    }

    res.status(200).json({
      message: "Tweet deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting tweet: ", error);
    res
      .status(500)
      .json({ message: "Error deleting tweet", error: error.message });
  }
};

// Like a tweet
const likeTweetController = async (req, res) => {
  try {
    const tweetId = req.params.tweetId;
    const existingLike = await Like.findOne({ tweetId, userId: req.user.data });

    if (existingLike) {
      return res.status(400).json({ message: "Tweet already liked" });
    }

    const newLike = await Like.create({ tweetId, userId: req.user.data });

    res.status(200).json({
      message: "Tweet liked successfully",
      like: newLike,
    });
  } catch (error) {
    console.error("Error liking tweet: ", error);
    res
      .status(500)
      .json({ message: "Error liking tweet", error: error.message });
  }
};

// Unlike a tweet
const unlikeTweetController = async (req, res) => {
  try {
    const tweetId = req.params.tweetId;
    const deletedLike = await Like.findOneAndDelete({
      tweetId,
      userId: req.user.data,
    });

    if (!deletedLike) {
      return res.status(400).json({ message: "Like not found" });
    }

    res.status(200).json({
      message: "Tweet unliked successfully",
    });
  } catch (error) {
    console.error("Error unliking tweet: ", error);
    res
      .status(500)
      .json({ message: "Error unliking tweet", error: error.message });
  }
};

// Comment on a tweet
const commentOnTweetController = async (req, res) => {
  try {
    const tweetId = req.params.tweetId;
    const { content } = req.body;
    const newComment = await Comment.create({
      tweetId,
      userId: req.user.data,
      content,
    });

    res.status(200).json({
      message: "Comment added successfully",
      comment: newComment,
    });
  } catch (error) {
    console.error("Error commenting on tweet: ", error);
    res
      .status(500)
      .json({ message: "Error commenting on tweet", error: error.message });
  }
};

// Delete a comment
const deleteCommentController = async (req, res) => {
  try {
    const tweetId = req.params.tweetId;
    const commentId = req.params.commentId;
    const deletedComment = await Comment.findOneAndDelete({
      _id: commentId,
      tweetId,
      userId: req.user.data,
    });

    if (!deletedComment) {
      return res
        .status(404)
        .json({ message: "Comment not found or not authorized" });
    }

    res.status(200).json({
      message: "Comment deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting comment: ", error);
    res
      .status(500)
      .json({ message: "Error deleting comment", error: error.message });
  }
};

export {
  createTweetController,
  getUserTweetsController,
  editTweetController,
  deleteTweetController,
  likeTweetController,
  unlikeTweetController,
  commentOnTweetController,
  deleteCommentController,
};
