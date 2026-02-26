import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

dotenv.config();

// ================= BASIC SETUP =================

const app = express();
const PORT = process.env.PORT || 5000;

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// ================= DATABASE =================

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.log("Database connection failed:");
    console.log(err.message);
  });


// ================= MODEL =================

const sellSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    images: { type: [String], required: true },
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

const Sell = mongoose.model("Sell", sellSchema);


// ================= MULTER CONFIG =================

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { files: 5 },
});


// ================= ROUTES =================


// 🔥 Submit Sell Request
// POST → /api/sell
app.post("/api/sell", upload.array("images", 5), async (req, res) => {
  try {
    if (!req.files || req.files.length < 2) {
      return res.status(400).json({ message: "Minimum 2 images required" });
    }

    const imagePaths = req.files.map((file) => file.filename);

    const newSell = new Sell({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      images: imagePaths,
    });

    await newSell.save();

    res.status(201).json({ message: "Sell request submitted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// 🔥 Get All Sell Requests (Admin)
// GET → /api/sell/admin
app.get("/api/sell/admin", async (req, res) => {
  try {
    const data = await Sell.find().sort({ createdAt: -1 });

    if (data.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No sell requests available",
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      data,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch sell requests",
      error: error.message,
    });
  }
});


// 🔥 Approve Request
// PUT → /api/sell/approve/:id
app.put("/api/sell/approve/:id", async (req, res) => {
  try {
    await Sell.findByIdAndUpdate(req.params.id, { status: "approved" });
    res.json({ message: "Approved successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// 🔥 Reject Request
// PUT → /api/sell/reject/:id
app.put("/api/sell/reject/:id", async (req, res) => {
  try {
    await Sell.findByIdAndUpdate(req.params.id, { status: "rejected" });
    res.json({ message: "Rejected successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// 🔥 Get Approved Products (User View)
// GET → /api/sell/products

app.get("/api/sell/products", async (req, res) => {
  try {
    const products = await Sell.find({ status: "approved" }).sort({
      createdAt: -1,
    });

    if (products.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No products available as of now",
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      data: products,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
});