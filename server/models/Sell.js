import mongoose from "mongoose";

const sellSchema = new mongoose.Schema(
  {
    ownerName: { type: String, required: true },
    phone: { type: String, required: true },
    vehicleName: { type: String, required: true },
    images: { type: [String], required: true },
    price: { type: [String], required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.model("Sell", sellSchema);