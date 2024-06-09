import path from "path";
import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import { fileURLToPath } from "url";

// Config environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;

// ES module fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.resolve();

// Database config
connectDB();

// Initialize Express app
const app = express();

// Middleware config
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// API routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// Serve static files only in development mode
if (process.env.NODE_ENV === 'development') {
    app.use(express.static(path.join(__dirname, "/client/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "./client/dist/index.html"));
    });
} else {
    // Handle non-API routes in production
    app.get("/", (req, res) => {
        res.status(404).send('API is running, but static files are not available.');
    });
}

// Start server
app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.blue.bold);
});
