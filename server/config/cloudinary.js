import { v2 as cloudinary } from "cloudinary";
import catchAsync from "../utils/catchAsync.js";

const cloudinaryConnect = catchAsync(async () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
});

export default cloudinaryConnect;
