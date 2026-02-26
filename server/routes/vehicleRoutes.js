import express from "express";
import Vehicle from "../models/Vehicle.js";

const router = express.Router();

// Public
router.get("/", async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin
router.post("/admin", async (req, res) => {
  const vehicle = new Vehicle(req.body);
  await vehicle.save();
  res.json(vehicle);
});

export default router;