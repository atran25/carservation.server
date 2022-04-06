const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  reservationId: {
    type: String,
    unique: true,
  },
  parkingSpotId: String,
  userId: String,
  licensePlate: String,
  reservationDate: Date,
  time: Number,
});

module.exports = mongoose.model("Reservation", reservationSchema);
