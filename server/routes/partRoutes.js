import express from "express";
import Part from "../models/Part.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const parts = await Part.find();

    // Always return array
    res.status(200).json(parts);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;