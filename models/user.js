const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: Number,
  name: String,
  email: String,
  reservations: [Number],
  isEmployee: Boolean,
});

module.exports = mongoose.model("User", userSchema);
