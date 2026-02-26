import mongoose from "mongoose";

const partSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    sold: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Part", partSchema);