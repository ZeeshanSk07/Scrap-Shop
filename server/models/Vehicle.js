import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
  name: String,
  model: String,
  year: Number,
  price: Number,
  image: String
}, { timestamps: true });

export default mongoose.model("Vehicle", vehicleSchema);