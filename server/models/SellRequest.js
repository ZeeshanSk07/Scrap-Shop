import mongoose from "mongoose";

const sellRequestSchema = new mongoose.Schema({
  ownerName: String,
  phone: String,
  vehicleName: String,
  model: String,
  year: Number,
  condition: String,
  images: [String]   // 👈 store image paths
}, { timestamps: true });

export default mongoose.model("SellRequest", sellRequestSchema);