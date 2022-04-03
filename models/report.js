const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  parkingSpotId: Number,
  userId: Number,
  offenderId: String,
  offenderLicensePlate: String,
});

module.exports = mongoose.model("Report", reportSchema, "reports");
