import express from "express";
import Part from "../models/Part.js";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ✅ Add Part
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const part = new Part({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: req.file.filename,
    });

    await part.save();
    res.status(201).json({ message: "Part added successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to add part" });
  }
});

// ✅ Get Parts (Hide sold automatically)
router.get("/", async (req, res) => {
  try {
    const isAdmin = req.query.admin === "true";

    const parts = isAdmin
      ? await Part.find().sort({ createdAt: -1 })
      : await Part.find({ sold: false }).sort({ createdAt: -1 });

    res.json(parts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch parts" });
  }
});

// ✅ Edit Price
router.put("/:id/price", async (req, res) => {
  try {
    await Part.findByIdAndUpdate(req.params.id, {
      price: req.body.price,
    });
    res.json({ message: "Price updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update price" });
  }
});

// ✅ Mark Sold
router.put("/:id/sold", async (req, res) => {
  try {
    await Part.findByIdAndUpdate(req.params.id, { sold: true });
    res.json({ message: "Part marked as sold" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update status" });
  }
});

// ✅ Delete
router.delete("/:id", async (req, res) => {
  try {
    await Part.findByIdAndDelete(req.params.id);
    res.json({ message: "Part deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete part" });
  }
});

export default router;