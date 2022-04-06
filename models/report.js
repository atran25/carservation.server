const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  parkingSpotId: String,
  userId: String,
  offenderId: String,
  offenderLicensePlate: String,
});

module.exports = mongoose.model("Report", reportSchema);
