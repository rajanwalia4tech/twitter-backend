const express = require("express");
const router = express.Router();
const {userController} = require("../controllers");
// all routes are prefixed with  /user
router.post("/",userController.signup);

router.get("/profile",userController.getUserProfile);
module.exports = router;