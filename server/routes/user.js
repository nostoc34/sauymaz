import express from "express";
import { newUser, updateUser, getUser } from "../controllers/user.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.get("/",  getUser);
router.post("/",protect, newUser);
router.put("/:id", protect, updateUser);

export default router;