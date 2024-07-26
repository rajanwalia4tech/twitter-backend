# Twitter Backend Project

## Overview

This project is a backend service for a simplified version of Twitter. It includes functionalities for user authentication, tweeting, liking tweets, commenting on tweets, and following/unfollowing users. The service is built using Node.js, Express, and MongoDB, with Mongoose as the ODM.

## Features

### User Authentication

- **Signup**: Create a new user.
- **Signin**: Authenticate an existing user and issue a JWT token.

### User Profile Management

- **GET /users/profile**: Retrieve the profile information of the authenticated user.
- **PATCH /users**: Update profile information like name, bio, and password.
- **PATCH /users/profile-picture**: Update the user's profile picture.
- **PUT /users/{userId}/follow**: Follow a user.
- **DELETE /users/{userId}/follow**: Unfollow a user.
- **GET /users/{userId}/followers**: Fetch all followers of a user.
- **GET /users/{userId}/followees**: Fetch all users followed by a user.

### Tweet Management

- **POST /tweets**: Create a new tweet (maximum of 280 characters).
- **GET /tweets/{userId}**: Fetch all tweets of a user.
- **PATCH /tweets/{tweetId}**: Edit an existing tweet.
- **DELETE /tweets/{tweetId}**: Delete a tweet.
- **PUT /tweets/{tweetId}/like**: Like a tweet.
- **DELETE /tweets/{tweetId}/like**: Unlike a tweet.
- **PUT /tweets/{tweetId}/comment**: Comment on a tweet.
- **DELETE /tweets/{tweetId}/comment/{commentId}**: Delete a comment on a tweet.

## Models

### User Model

```javascript
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, enum: ["male", "female", "other"], required: true },
  bio: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
