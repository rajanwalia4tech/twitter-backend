const express = require("express");
const router = express.Router();
const usersRoutes = require("./users.routes");
const tweetsRoutes = require("./tweets.routes");

router.use("/users",usersRoutes);

router.use("/tweets",tweetsRoutes);

module.exports = router;