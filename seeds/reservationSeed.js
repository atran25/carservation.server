const mongoose = require("mongoose");
const config = require("../utils/config");
const Reservation = require("../models/reservation")

mongoose.connect(config.MONGODB_URI)
.then(() => {
    console.log("Connected to MongoDB and will now seed reservation collection");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB: ", error.message);
  });

//clear all current reservations
Reservation.deleteMany({})
.then((p) => {
    console.log(p)
})
.catch(err => {
    console.log(err)
})  

const reservations = [

    {
        reservationId: 2468,
        parkingSpotId: 1,
        userId: 13579,
        licensePlate: "ABC157",
        reservationDate: "2022-5-12",
        hourStart: 14,
        hourEnd: 15
    }

]

Reservation.insertMany(reservations)
    .then((p) => {
        console.log(p)
    })
    .catch(err => {
        console.log(err)
    })