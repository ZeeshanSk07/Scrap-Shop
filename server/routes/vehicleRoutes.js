import express from "express";
import Vehicle from "../models/Vehicle.js";
import multer from "multer";

const router = express.Router();

/* =============================
   MULTER CONFIG
============================= */

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

/* =============================
   ADD VEHICLE (ADMIN)
============================= */

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, description, price } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    if (!name || !description || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const vehicle = new Vehicle({
      name,
      description,
      price,
      image: req.file.filename,
    });

    await vehicle.save();

    res.status(201).json(vehicle);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add vehicle" });
  }
});

/* =============================
   GET VEHICLES
============================= */

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

/* =============================
   UPDATE PRICE
============================= */

router.put("/:id/price", async (req, res) => {
  try {
    const { price } = req.body;

    if (!price) {
      return res.status(400).json({ message: "Price required" });
    }

    await Vehicle.findByIdAndUpdate(req.params.id, { price });

    res.json({ message: "Price updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update price" });
  }
});

/* =============================
   MARK SOLD
============================= */

router.put("/:id/sold", async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    if (vehicle.sold) {
      return res.status(400).json({ message: "Vehicle already sold" });
    }

    vehicle.sold = true;
    await vehicle.save();

    res.json({ message: "Vehicle marked as sold" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update status" });
  }
});

/* =============================
   DELETE VEHICLE
============================= */

router.delete("/:id", async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    await vehicle.deleteOne();

    res.json({ message: "Vehicle deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete vehicle" });
  }
});

export default router;