import express from "express";
import { getAllBlogs, getBlog, deleteBlog } from "../controllers/blog.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.get("/",  getAllBlogs);
router.get("/:id", getBlog);
router.delete("/:id", protect, deleteBlog);

export default router;