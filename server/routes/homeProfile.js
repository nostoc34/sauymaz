import express from "express";
import { getProfile } from "../controllers/homeProfile.js";

const router = express.Router();

router.get("/", getProfile);

export default router;