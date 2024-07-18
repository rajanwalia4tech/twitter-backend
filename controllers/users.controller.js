import User from "../models/users.model.js";
import bcrypt from "bcrypt";

const signController = async (req, res) => {
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

    res.status(201).json({
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

export { signController };
