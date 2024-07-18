import express from "express"
const router = express.Router();
import { signController } from "../controllers/users.controller.js";

router.post("/signup", signController);

export default router;
