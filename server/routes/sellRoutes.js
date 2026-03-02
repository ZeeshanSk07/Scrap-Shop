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
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    if (!req.files || req.files.length < 2) {
      return res.status(400).json({
        error: "Minimum 2 images required"
      });
    }

    const images = req.files.map(file => file.filename);

    const sell = new Sell({
      ownerName: req.body.ownerName,
      phone: req.body.phone,
      vehicleName: req.body.vehicleName,
      price: req.body.price,
      images,
    });

    await sell.save();

    res.status(201).json({ message: "Sell request submitted" });

  } catch (err) {
    console.error("SELL ERROR:", err);
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