import "dotenv/config";
import express from "express";
import dbConnect from "./config/dbConnect.js";
const PORT = process.env.PORT || 7017;

const app = express();

app.use(express.json({ limit: "10kb" }));

// Connect to database
dbConnect(process.env.DATABASE_URI);

// health check
app.get("/", (req, res) => {
  res
    .status(200)
    .json({ status: "success", message: "Server is up and running..." });
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
