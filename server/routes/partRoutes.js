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

router.post("/", upload.single("image"), async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const { name, vehicle, price, description } = req.body;

    if (!name || !vehicle || !price || !description) {
      return res.status(400).json({ message: "All fields required" });
    }

    const newPart = new Part({
      name,
      vehicle,
      price,
      description,
      image: req.file.filename,
    });

    await newPart.save();
    res.status(201).json(newPart);
  } catch (err) {
  console.error(err);   // 👈 VERY IMPORTANT
  res.status(500).json({ message: err.message });
  }
});

// ✅ Get Parts (Hide sold automatically)
router.get("/", async (req, res) => {
  try {
    const isAdmin = req.query.admin === "true";

    const parts = isAdmin
      ? await Part.find().populate("vehicle").sort({ createdAt: -1 })
      : await Part.find({ sold: false })
          .populate("vehicle")
          .sort({ createdAt: -1 });

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

router.put("/:id/sold", async (req, res) => {
  try {
    const part = await Part.findById(req.params.id);

    if (part.sold) {
      return res.status(400).json({ message: "Already sold" });
    }

    part.sold = true;
    await part.save();

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