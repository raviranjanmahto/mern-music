import { v2 as cloudinary } from "cloudinary";
import Album from "../models/albumModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

const addAlbum = catchAsync(async (req, res, next) => {
  const { name, desc, bgColor } = req.body;
  const imageFile = req.file;

  if (!name || !desc || !bgColor || !imageFile)
    return next(new AppError("All fields are required", 400));

  const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
    resource_type: "image",
  });
  const album = Album({
    name,
    desc,
    bgColor,
    image: imageUpload.secure_url,
  });
  await album.save();
  res.status(200).json({ status: "success", album });
});

const getAllAlbum = catchAsync(async (req, res, next) => {
  const albums = await Album.find({});
  res.status(200).json({ status: "success", albums });
});

const removeAlbum = catchAsync(async (req, res, next) => {
  if (!req.params.id) return next(new AppError("Album id required", 404));

  const album = await Album.findById(req.params.id);
  if (!album) return next(new AppError("Album not found", 404));
  await album.deleteOne();

  res.status(200).json({ status: "success", album: null });
});

export default { addAlbum, getAllAlbum, removeAlbum };
