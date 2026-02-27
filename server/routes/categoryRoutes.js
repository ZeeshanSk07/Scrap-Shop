import express from "express";
import VehicleCategory from "../models/VehicleCategory.js";

const router = express.Router();


// ✅ GET all categories
router.get("/", async (req, res) => {
  try {
    const categories = await VehicleCategory.find().sort({ name: 1 });
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// ✅ POST new category
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const existing = await VehicleCategory.findOne({ name });

    if (existing) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const newCategory = new VehicleCategory({ name });
    await newCategory.save();

    res.status(201).json(newCategory);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// ✅ DELETE category (optional but useful)
router.delete("/:id", async (req, res) => {
  try {
    await VehicleCategory.findByIdAndDelete(req.params.id);
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;