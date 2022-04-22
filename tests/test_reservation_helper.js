const Reservation = require("../models/reservation");

const initialReservations = [
  {
    reservationId: "ca485086-f01b-455e-9e18-6704696cc583",
    parkingSpotId: "B",
    userId: "RG2prv7v6whlSantpYOGijyg8eH3",
    licensePlate: "f42",
    reservationDate: "2022-04-18",
    time: 19,
    isCheckedIn: false,
  },
  {
    reservationId: "19ed3897-44af-4fdb-84a2-56fa5a781982",
    parkingSpotId: "D",
    userId: "RG2prv7v6whlSantpYOGijyg8eH3",
    licensePlate: "43",
    reservationDate: "2022-04-19",
    time: 19,
    isCheckedIn: false,
  },
  {
    reservationId: "19ed3897-44af-4fdb-84a2-56fa5a781982new1",
    parkingSpotId: "F",
    userId: "RG2prv7v6whlSantpYOGijyg8eH3new1",
    licensePlate: "43",
    reservationDate: "2022-04-19",
    time: 29,
    isCheckedIn: false,
  },
  {
    reservationId: "19ed3897-44af-4fdb-84a2-56fa5a781982new2",
    parkingSpotId: "D",
    userId: "RG2prv7v6whlSantpYOGijyg8eH3",
    licensePlate: "43",
    reservationDate: "2022-04-19",
    time: 19,
    isCheckedIn: false,
  },
];

const reservationsInDB = async () => {
  const reservations = await Reservation.find({});
  return reservations.map((reservation) => reservation.toJSON());
};

module.exports = {
  initialReservations,
  reservationsInDB,
};
