
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRouters.js"
import contactRoutes from "./routes/contactRoutes.js"
import connectDB from "./config/db.js";

dotenv.config();
const app = express();

//Database
connectDB();


//Middleware
app.use(express.json());
app.use(cors({origin:true,credentials: true}));
app.use(cookieParser());

//Route
app.use("/api/user", userRoutes);
app.use("/api/contact",contactRoutes);

const PORT = process.env.PORT || 5000

app.listen(PORT,() =>{
    console.log(`Example app listing on port ${PORT}`);
})