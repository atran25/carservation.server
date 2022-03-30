const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  parkingSpotId: Number,
  userId: Number,
  offenderId: Number,
  offenderLicensePlate: Number,
});

module.exports = mongoose.model("Report", reportSchema);
