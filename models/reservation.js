const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  reservationId: String,
  parkingSpotId: String,
  userId: String,
  licensePlate: String,
  reservationDate: Date,
  hourStart: Number,
  hourEnd: Number,
});

module.exports = mongoose.model("Reservation", reservationSchema);
