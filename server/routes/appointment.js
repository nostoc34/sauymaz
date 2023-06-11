import express from "express";
import { newAppointment, getAppointments, deleteAppos } from "../controllers/appointment.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", protect, newAppointment);
router.get("/", getAppointments);
// router.put("/:id", protect, updateRegistry);
router.delete("/", protect, deleteAppos);

export default router;