import express from "express";
import { getAllAnnouncements, getAnnouncement, deleteAnnouncement } from "../controllers/announcement.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.get("/",  getAllAnnouncements);
router.get("/:id", getAnnouncement);
router.delete("/:id", protect, deleteAnnouncement);

export default router;