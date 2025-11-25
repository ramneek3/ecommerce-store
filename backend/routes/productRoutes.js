const express = require("express");
const Product = require("../models/Product");
const sampleProducts = require("../data/products");

const router = express.Router();

// Seed products (call once: GET /api/products/seed)
router.get("/seed", async (req, res) => {
  try {
    await Product.deleteMany({});
    await Product.insertMany(sampleProducts);
    res.json({ message: "Products seeded" });
  } catch (err) {
    res.status(500).json({ message: "Error seeding", error: err });
  }
});

// GET /api/products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products" });
  }
});

module.exports = router;