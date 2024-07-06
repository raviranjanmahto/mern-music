import mongoose from "mongoose";

const dbConnect = async Database_URI => {
  if (!Database_URI) return console.log("Please provide Database Env");
  await mongoose
    .connect(Database_URI)
    .then(() => console.log(`Database connection established 🥰💚🥰`))
    .catch(() => console.log(`Error connecting to database 🎇💣💣💣🎇`));
};

export default dbConnect;
