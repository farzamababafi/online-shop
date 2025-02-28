const mongoose = require("mongoose");

const commoditySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  inventoryStatus: { type: String, default: "In Stock" },
  category: { type: String },
  image: { type: String },
});

module.exports = mongoose.model("Commodity", commoditySchema);
