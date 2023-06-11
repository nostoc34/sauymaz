import express from "express";
import { newProgramo, updateProgramo, getProgramo } from "../controllers/programo.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", protect, newProgramo);
router.get("/", getProgramo);
router.put("/:id", protect, updateProgramo);

export default router;