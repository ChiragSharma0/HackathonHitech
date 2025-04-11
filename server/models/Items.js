const mongoose = require("mongoose");

const shopItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, default: "" }, // Optional
  price: { type: String, required: true },
  work: { type: String, required: true },
  items: [{ type: String, required: true }],
});

module.exports = mongoose.model("ShopItem", shopItemSchema);
