const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  type: String, // topwear/bottomwear etc.
  image: String,
});

module.exports = mongoose.model("Product", productSchema);