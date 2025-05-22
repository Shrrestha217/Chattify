import express from "express";
import dotenv from "dotenv";
import cookieParse from "cookie-parser"

import authRoutes from "./routes/auth.route.js"
import messageRoute from "./routes/message.route.js"
import { app, server } from "./lib/socket.js"
import { connectDB } from "./lib/db.js";
import cors from "cors"

import path from "path";

dotenv.config()

const PORT = process.env.PORT
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParse());
app.use(cors({
        origin: "http://localhost:5173",
        credentials: true
    })
);

app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoute)

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    })
}

server.listen(PORT, () => {
    console.log("server is running on PORT: " + PORT);
    connectDB();
});
