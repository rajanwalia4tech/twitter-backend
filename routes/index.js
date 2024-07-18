import express from "express";
const router = express.Router();
import usersRoutes from "./users.routes.js";
// import tweetsRoutes from "./tweets.routes.js";

router.use("/users", usersRoutes);

// router.use("/tweets", tweetsRoutes);

export { router };