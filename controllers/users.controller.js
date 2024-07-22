import User from "../models/users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signupController = async (req, res) => {
  try {
    const { name, gender, bio, email, password, profilePicture } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required" });
    }

    // Hash password
    const hashpassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      name,
      gender,
      bio,
      email,
      password: hashpassword,
      profilePicture,
    });

    newUser.password = undefined;
    const token = jwt.sign({ data: email }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });
    res
      .cookie("access_token", "Bearer " + token, {
        expires: new Date(Date.now() + 8 * 3600000), // cookie will be removed after 8 hours
      })
      .status(201)
      .json({
        message: "User created successfully",
        user: newUser,
      });
  } catch (error) {
    console.error("Error while registering the user: ", error);
    res.status(500).json({
      message: "Error while registering the user",
      error: error.message,
    });
  }
};

const signInController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ data: email }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });

    res
      .cookie("access_token", "Bearer " + token, {
        expires: new Date(Date.now() + 8 * 3600000), // cookie will be removed after 8 hours
      })
      .status(200)
      .json({
        message: "User signed in successfully",
        user: { ...user._doc, password: undefined }, // Avoid sending password back
      });
  } catch (error) {
    console.error("Error while signing in the user: ", error);
    res.status(500).json({
      message: "Error while signing in the user",
      error: error.message,
    });
  }
};

const profileController = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.data }).select(
      "-password"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User profile retrieved successfully",
      user,
    });
  } catch (error) {
    console.error("Error retrieving user profile: ", error);
    res.status(500).json({
      message: "Error retrieving user profile",
      error: error.message,
    });
  }
};

const updateProfileController = async (req, res) => {
  try {
    const { name, bio, password } = req.body;
    const updateData = {};

    if (name) updateData.name = name;
    if (bio) updateData.bio = bio;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const updatedUser = await User.findOneAndUpdate(
      { email: req.user.data },
      { $set: updateData },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user profile: ", error);
    res.status(500).json({
      message: "Error updating user profile",
      error: error.message,
    });
  }
};


const followUserController = async (req, res) => {
  try {
    console.log(1);
    const { userId } = req.params;
    const currentUserId = req.user._id;
    console.log(2);
    
    if (currentUserId.toString() === userId) {
      console.log(3);
      return res.status(400).json({ message: "You cannot follow yourself." });
    }
    console.log(4);
    console.log(userId);
    const userToFollow = await User.findById(userId);
    console.log(5);
    if (!userToFollow) {
      console.log(6);
      return res.status(404).json({ message: "User not found." });
    }
    
    console.log(7);
    const currentUser = await User.findById(currentUserId);
    
    console.log(8);
    if (currentUser.following.includes(userId)) {
      console.log(9);
      return res.status(400).json({ message: "You are already following this user." });
    }
    
    console.log(10);
    currentUser.following.push(userId);
    userToFollow.followers.push(currentUserId);
    console.log(11);
    
    await currentUser.save();
    await userToFollow.save();
    console.log(11);
    
    res.status(200).json({ message: "User followed successfully." });
    console.log(12);
  } catch (error) {
    console.error("Error following user: ", error);
    res.status(500).json({ message: "Error following user", error: error.message });
  }
};


const unfollowUserController = async (req, res) => {
  try {
    const userIdToUnfollow = req.params.userId; // Use userId to match your route parameter
    const currentUserId = req.user._id;

    if (String(currentUserId) === String(userIdToUnfollow)) {
      return res.status(400).json({ message: "You cannot unfollow yourself." });
    }

    const userToUnfollow = await User.findById(userIdToUnfollow);
    const currentUser = await User.findById(currentUserId);

    if (!userToUnfollow || !currentUser) {
      return res.status(404).json({ message: "User not found." });
    }

    if (!currentUser.following.includes(userIdToUnfollow)) {
      return res
        .status(400)
        .json({ message: "You are not following this user." });
    }

    currentUser.following = currentUser.following.filter(
      (id) => String(id) !== String(userIdToUnfollow)
    );
    userToUnfollow.followers = userToUnfollow.followers.filter(
      (id) => String(id) !== String(currentUserId)
    );

    await currentUser.save();
    await userToUnfollow.save();

    res.status(200).json({ message: "Successfully unfollowed the user." });
  } catch (error) {
    console.error("Error unfollowing user: ", error);
    res
      .status(500)
      .json({ message: "Error unfollowing user", error: error.message });
  }
};



const getFollowersController = async (req, res) => {
  try {
    const userId = req.params.userid;
    const user = await User.findById(userId).populate(
      "followers",
      "name email profilePicture"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "Followers retrieved successfully",
      followers: user.followers,
    });
  } catch (error) {
    console.error("Error retrieving followers: ", error);
    res.status(500).json({
      message: "Error retrieving followers",
      error: error.message,
    });
  }
};

const getFolloweesController = async (req, res) => {
  try {
    const userId = req.params.userid;
    const user = await User.findById(userId).populate(
      "following",
      "name email profilePicture"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "Followees retrieved successfully",
      followees: user.following,
    });
  } catch (error) {
    console.error("Error retrieving followees: ", error);
    res.status(500).json({
      message: "Error retrieving followees",
      error: error.message,
    });
  }
};

const updateProfilePictureController = async (req, res) => {
  try {
    const { profilePicture } = req.body;
    const userId = req.user.data;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePicture },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile picture updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating profile picture: ", error);
    res.status(500).json({
      message: "Error updating profile picture",
      error: error.message,
    });
  }
};

export {
  signupController,
  signInController,
  profileController,
  updateProfileController,
  followUserController,
  unfollowUserController,
  getFollowersController,
  getFolloweesController,
  updateProfilePictureController,
};
