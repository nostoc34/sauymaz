import express from "express";
import { newRegistry, getProgram, updateRegistry } from "../controllers/program.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", protect, newRegistry);
router.get("/", getProgram);
router.put("/:id", protect, updateRegistry);

export default router;