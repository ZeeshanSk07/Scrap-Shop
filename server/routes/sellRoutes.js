import express from "express";
import SellRequest from "../models/SellRequest.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// User submits sell request with images
router.post("/", upload.array("images", 5), async (req, res) => {
  try {
    if (!req.files || req.files.length < 2) {
      return res.status(400).json({ message: "Minimum 2 images required" });
    }

    const imagePaths = req.files.map(file => file.filename);

    const request = new SellRequest({
      ...req.body,
      images: imagePaths
    });

    await request.save();

    res.json({ message: "Vehicle submitted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin view
router.get("/admin", async (req, res) => {
  const requests = await SellRequest.find();
  res.json(requests);
});

export default router;