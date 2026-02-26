import express from "express";
import Vehicle from "../models/Vehicle.js";
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ✅ Add Vehicle (Admin)
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const vehicle = new Vehicle({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: req.file.filename,
    });

    await vehicle.save();
    res.status(201).json({ message: "Vehicle added successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to add vehicle" });
  }
});

// ✅ Get Vehicles (Hide sold from marketplace)
router.get("/", async (req, res) => {
  try {
    const isAdmin = req.query.admin === "true";

    const vehicles = isAdmin
      ? await Vehicle.find().sort({ createdAt: -1 })
      : await Vehicle.find({ sold: false }).sort({ createdAt: -1 });

    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch vehicles" });
  }
});

// ✅ Edit Price
router.put("/:id/price", async (req, res) => {
  try {
    await Vehicle.findByIdAndUpdate(req.params.id, {
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
    await Vehicle.findByIdAndUpdate(req.params.id, { sold: true });
    res.json({ message: "Vehicle marked as sold" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update status" });
  }
});

// ✅ Delete
router.delete("/:id", async (req, res) => {
  try {
    await Vehicle.findByIdAndDelete(req.params.id);
    res.json({ message: "Vehicle deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete vehicle" });
  }
});

export default router;