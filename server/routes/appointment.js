import express from "express";
import { newAppointment } from "../controllers/appointment.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", protect, newAppointment);
// router.get("/", getRegistrations);
// router.put("/:id", protect, updateRegistry);
// router.delete("/:id", protect, deleteRegistry);

export default router;