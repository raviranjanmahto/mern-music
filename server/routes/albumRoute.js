import express from "express";
const router = express.Router();

import albumController from "../controllers/albumController.js";
import upload from "../middlewares/multerMiddleware.js";

router.post("/add", upload.single("image"), albumController.addAlbum);
router.get("/list", albumController.getAllAlbum);
router.post("/remove/:id", albumController.removeAlbum);

export default router;
