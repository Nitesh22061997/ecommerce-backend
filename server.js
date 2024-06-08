import path from "path";
import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js"
import cors from "cors"
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from "./routes/productRoutes.js"

// config env
dotenv.config()

const PORT = process.env.PORT || 5000

const __dirname = path.resolve()

// database config
connectDB();

//rest object
const app = express()

// middldeware config
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

// routes
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/category", categoryRoutes)
app.use("/api/v1/product", productRoutes)


app.use(express.static(path.join(__dirname, "/client/dist")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"))
})

//PORT

//run or listen

app.listen(PORT, () => {
    console.log(`Server is running ${process.env.DEV_MODE} on port ${PORT}`.blue.bold);
})