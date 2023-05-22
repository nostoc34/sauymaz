import express from "express";
import { newRegistry, getRegistrations, deleteRegistry } from "../controllers/navbarLink.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.get("/",  getRegistrations);
router.post("/",protect, newRegistry);
router.delete("/:id", protect, deleteRegistry);

export default router;