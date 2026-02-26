import mongoose from "mongoose";

const partSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String
}, { timestamps: true });

export default mongoose.model("Part", partSchema);