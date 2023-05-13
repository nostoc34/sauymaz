import express from "express";
import { newRegistry, updateRegistry, getRegistrations, deleteRegistry } from "../controllers/academic.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", protect, newRegistry);
router.get("/", getRegistrations);
router.put("/:id", protect, updateRegistry);
router.delete("/:id", protect, deleteRegistry);

export default router;