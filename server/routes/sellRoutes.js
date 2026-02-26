import express from "express";
import Sell from "../models/Sell.js";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Submit Sell Request
router.post("/", upload.array("images", 5), async (req, res) => {
  try {
    const images = req.files.map((file) => file.filename);

    const sell = new Sell({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      images,
    });

    await sell.save();
    res.status(201).json({ message: "Sell request submitted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to submit request" });
  }
});

// Admin view sell requests
router.get("/admin", async (req, res) => {
  const data = await Sell.find().sort({ createdAt: -1 });
  res.json(data);
});

// Approve
router.put("/approve/:id", async (req, res) => {
  await Sell.findByIdAndUpdate(req.params.id, { status: "approved" });
  res.json({ message: "Approved" });
});

// Reject
router.put("/reject/:id", async (req, res) => {
  await Sell.findByIdAndUpdate(req.params.id, { status: "rejected" });
  res.json({ message: "Rejected" });
});

export default router;