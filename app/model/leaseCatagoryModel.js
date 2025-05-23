const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  subcategories: [
    {
      name: { type: String, required: true },
      subcategories: [{ name: { type: String, required: true } }],
    },
  ],
});

module.exports = mongoose.model("LeaseCatagory", categorySchema);