import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRouters.js"
import contactRoutes from "./routes/contactRoutes.js"
import connectDB from "./config/db.js"; // This is the function that might throw an error

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Set up CORS
// We will set the origin dynamically based on environment or allow all for API development
app.use(cors({
    origin: true, // Allows all origins for API calls (Render's default is safe)
    credentials: true
}));
app.use(cookieParser());

// Database Connection
// Wrap the connection in a function and use .then/.catch for better error handling
const startServer = async () => {
    try {
        await connectDB();
        console.log("Database connected successfully.");

        // Routes - ONLY enable routes after successful DB connection
        app.use("/api/user", userRoutes);
        app.use("/api/contact", contactRoutes);

        // Basic sanity check route
        app.get('/', (req, res) => {
            res.status(200).send('API is running and ready.');
        });
        
        // Define PORT using environment variable with fallback
        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });

    } catch (error) {
        // THIS ERROR MESSAGE IS CRITICAL FOR DEBUGGING ON RENDER
        console.error("Server failed to start due to database connection error:");
        console.error(error);
        process.exit(1); // Exit the process immediately if DB fails
    }
};

startServer();
