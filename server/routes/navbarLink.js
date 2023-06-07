import express from "express";
import { newRegistry, getRegistrations, updateRegistry } from "../controllers/navbarLink.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.get("/",  getRegistrations);
router.post("/",protect, newRegistry);
router.put("/:id", protect, updateRegistry);

export default router;