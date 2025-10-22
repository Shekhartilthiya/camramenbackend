import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRouters.js";
import contactRoutes from "./routes/contactRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

// ✅ Middleware to parse JSON & form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ CORS setup (allows frontend to communicate)
app.use(
    cors({
      origin: [
        "https://camramen-frontend.vercel.app/", // your production frontend
        "http://localhost:5173"        // local dev (Vite or React)
      ],
      credentials: true,
    })
  );
  

// ✅ Cookie parser
app.use(cookieParser());

// ✅ Connect to MongoDB
const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ Database connected successfully.");

    // ✅ Routes
    app.use("/api/user", userRoutes);
    app.use("/api/contact", contactRoutes);

    // ✅ Sanity check
    app.get("/", (req, res) => {
      res.status(200).send("Camramen API is running successfully 🚀");
    });

    // ✅ Port (Render auto assigns, local fallback)
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`✅ Server listening on port ${PORT}`));
  } catch (error) {
    console.error("❌ Server failed to start due to database connection error:");
    console.error(error);
    process.exit(1);
  }
};

startServer();
