import Song from "../models/songModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import { v2 as cloudinary } from "cloudinary";

const addSong = catchAsync(async (req, res, next) => {
  const { name, desc, album } = req.body;
  const audioFile = req.files.audio[0];
  const imageFile = req.files.image[0];

  const audioUpload = await cloudinary.uploader.upload(audioFile.path, {
    resource_type: "video",
  });
  const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
    resource_type: "image",
  });
  const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(
    audioUpload.duration % 60
  )}`;

  const song = Song({
    name,
    desc,
    album,
    image: imageUpload.secure_url,
    audio: audioUpload.secure_url,
    duration,
  });
  await song.save();

  res.status(201).json({ status: "success", song });
});

const listSong = catchAsync(async (req, res, next) => {
  const songs = await Song.find({});
  res.json({ status: "success", data: songs });
});

const removeSong = catchAsync(async (req, res, next) => {
  const song = await Song.findById(req.params.id);
  if (!song) return next(new AppError("Song not found", 404));
  await song.deleteOne();
  res.json({ status: "success", song: null });
});

export default { addSong, listSong, removeSong };
