import express from "express";
import { contact } from "../controllers/contactController.js";


router.get("/browserinfo", (req, res) => {
    console.log(`browser info url: ${req.originalUrl}`);
    res.json(req.headers);
});
const router = express.Router();

router.post("/owner",(req,res)=>{
    console.log(`browser info url: ${req.originalUrl}`);
    res.json(req.headers);
    contact();
});

export default router;