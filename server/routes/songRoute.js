import express from "express";

import songController from "../controllers/songController.js";
import upload from "../middlewares/multerMiddleware.js";

const router = express.Router();

router.post(
  "/add",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  songController.addSong
);
router.get("/list", songController.listSong);
router.post("/remove/:id", songController.removeSong);

export default router;
