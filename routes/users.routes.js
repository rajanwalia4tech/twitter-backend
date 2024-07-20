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
  getFolloweesController,
  updateProfilePictureController,
} from "../controllers/users.controller.js";
import { authenticate } from "../middleware/authMiddleware.js";

router.post("/signup", signupController);
router.post("/signin", signInController);
router.get("/profile", authenticate, profileController);
router.patch("/", authenticate, updateProfileController);
router.put("/:userid/follow", authenticate, followUserController);
router.delete("/:userid/follow", authenticate, unfollowUserController);
router.get("/:userid/followers", authenticate, getFollowersController);
router.get("/:userid/followees", authenticate, getFolloweesController);
router.patch("/profile-picture", authenticate, updateProfilePictureController);

export default router;
