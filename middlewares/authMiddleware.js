import jwt from "jsonwebtoken";
import User from "../models/users.model.js";

const authenticate = async (req, res, next) => {
  const token =
    req.cookies.access_token?.split(" ")[1] ||
    req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Authentication failed, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findOne({ email: decoded.data });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Authentication failed, user not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res
      .status(401)
      .json({ message: "Authentication failed, invalid token" });
  }
};

export { authenticate };
