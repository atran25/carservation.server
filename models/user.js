const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
  },
  name: String,
  email: String,
  reservations: [String],
  isEmployee: Boolean,
});

module.exports = mongoose.model("User", userSchema);
