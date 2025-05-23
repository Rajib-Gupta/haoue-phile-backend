const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: false },
});

module.exports = mongoose.model("City", userSchema);
