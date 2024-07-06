import "dotenv/config";
import express from "express";

import dbConnect from "./config/dbConnect.js";
import AppError from "./utils/appError.js";
import globalErrorHandler from "./middlewares/errorMiddleware.js";
import songRoute from "./routes/songRoute.js";
import cloudinaryConnect from "./config/cloudinary.js";

const PORT = process.env.PORT || 7017;

const app = express();

app.use(express.json({ limit: "10kb" }));

// Connect to database
dbConnect(process.env.DATABASE_URI);

// Connect to cloudinary cloud to store song and image
cloudinaryConnect();

// health check
app.get("/", (req, res) => {
  res
    .status(200)
    .json({ status: "success", message: "Server is up and running..." });
});

// Routes
app.use("/api/v1/song", songRoute);

// 404 error handler for all other routes
app.all("*", (req, res, next) =>
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
);

// Global error middleware
app.use(globalErrorHandler);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
