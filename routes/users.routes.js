import express from "express";
const router = express.Router();
import {
  signupController,
  signInController,
  profileController,
  updateProfileController,
  followUserController,
  unfollowUserController,
  getFollowersController,
  getFollowingsController,
  updateProfilePictureController,
} from "../controllers/users.controller.js";
import { authenticate } from "../middlewares/authMiddleware.js";

router.post("/signup", signupController);
router.post("/signin", signInController);
router.get("/profile", authenticate, profileController);
router.patch("/", authenticate, updateProfileController);
router.put("/:userId/follow", authenticate, followUserController);
router.delete("/:userId/follow", authenticate, unfollowUserController);
router.get("/:userid/followers", authenticate, getFollowersController);
router.get("/:userid/followings", authenticate, getFollowingsController);
router.patch("/profile-picture", authenticate, updateProfilePictureController);

export default router;
