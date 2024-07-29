import express from "express";
const router = express.Router();
import {
  createTweetController,
  getUserTweetsController,
  editTweetController,
  deleteTweetController,
  likeTweetController,
  unlikeTweetController,
  commentOnTweetController,
  deleteCommentController,
} from "../controllers/tweets.controller.js";
import { authenticate } from "../middlewares/authMiddleware.js";

router.post("/", authenticate, createTweetController);
router.get("/:userId", getUserTweetsController);
router.patch("/", authenticate, editTweetController);
router.delete("/", authenticate, deleteTweetController);
router.put("/:tweetId/like", authenticate, likeTweetController);
router.delete("/:tweetId/like", authenticate, unlikeTweetController);
router.put("/:tweetId/comment", authenticate, commentOnTweetController);
router.delete(
  "/:tweetId/comment/:commentId",
  authenticate,
  deleteCommentController
);

export default router;
