import express from "express";
import { contact } from "../controllers/contactController.js";



const router = express.Router();

router.post("/owner",contact);

export default router;