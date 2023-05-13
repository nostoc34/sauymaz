import express from "express";
import { getContact, updateContact } from "../controllers/contact.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getContact);
router.put("/", protect, updateContact);

export default router;