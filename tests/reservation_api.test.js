const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
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
];

beforeEach(async () => {
  await Reservation.deleteMany({});
  let reservationObject = new Reservation(initialReservations[0]);
  await reservationObject.save();
  reservationObject = new Reservation(initialReservations[1]);
  await reservationObject.save();
});

test("all reservations are returned", async () => {
  const response = await api.get("/api/reservations");
  expect(response.body).toHaveLength(initialReservations.length);
});

test("initial reservations were added", async () => {
  const response = await api.get("/api/reservations");
  const reservationsIds = response.body.map(
    (reservations) => reservations.reservationId
  );

  expect(reservationsIds).toContain("ca485086-f01b-455e-9e18-6704696cc583");
  expect(reservationsIds).toContain("19ed3897-44af-4fdb-84a2-56fa5a781982");
});

test("reservations are returned as JSON objects", async () => {
  await api
    .get("/api/reservations")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 100000);

test("a reservation can be added", async () => {
  const newReservation = {
    reservationId: "bbe0b65c-e781-4bec-81ff-3555a0949b2cadded",
    parkingSpotId: "A",
    userId: "RG2prv7v6whlSantpYOGijyg8eH3newuser",
    licensePlate: "43420",
    reservationDate: "2023-05-25",
    time: 23,
    isCheckedIn: true,
  };

  await api
    .post("/api/reservations")
    .send(newReservation)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/reservations");
  const reservationId = response.body.map(
    (reservation) => reservation.reservationId
  );

  expect(response.body).toHaveLength(initialReservations.length + 1);
  expect(reservationId).toContain("bbe0b65c-e781-4bec-81ff-3555a0949b2cadded");
});

afterAll(() => {
  mongoose.connection.close();
});
