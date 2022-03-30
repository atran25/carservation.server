const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  reservationId: Number,
  parkingSpotId: Number,
  userId: Number,
  licensePlate: Number,
  reservationDate: Date,
  hourStart: Number,
  hourEnd: Number,
});

module.exports = mongoose.model("Reservation", reservationSchema);
