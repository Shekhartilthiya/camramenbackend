import express from "express";
import { contact } from "../controllers/contactController.js";

const router = express.Router();

// ✅ POST route for contact form
router.post("/owner", contact);

export default router;
