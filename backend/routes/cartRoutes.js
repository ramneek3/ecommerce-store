const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

let cartItems = []; // [{productId, qty}]

// GET /api/cart
router.get("/", async (req, res) => {
  const detailed = await Promise.all(
    cartItems.map(async (item) => {
      const product = await Product.findById(item.productId);
      return { product, qty: item.qty };
    })
  );
  res.json(detailed);
});

// POST /api/cart/add
router.post("/add", (req, res) => {
  const { productId } = req.body;
  const existing = cartItems.find((i) => i.productId === productId);
  if (existing) existing.qty += 1;
  else cartItems.push({ productId, qty: 1 });
  res.json({ message: "Added to cart", cartItems });
});

// POST /api/cart/clear
router.post("/clear", (req, res) => {
  cartItems = [];
  res.json({ message: "Cart cleared" });
});

module.exports = router;