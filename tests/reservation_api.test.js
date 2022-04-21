const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Reservation = require("../models/reservation");
const reservationHelper = require("./test_reservation_helper");

beforeEach(async () => {
  await Reservation.deleteMany({});
  // console.log("Delete all reservations in database");
  for (let reservation of reservationHelper.initialReservations) {
    let newReservation = new Reservation(reservation);
    await newReservation.save();
    // console.log("New reservation added to database");
  }
  // console.log("All initial reservation in database added");
});

test("all reservations are returned", async () => {
  const response = await api.get("/api/reservations");
  expect(response.body).toHaveLength(
    reservationHelper.initialReservations.length
  );
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

  const response = await reservationHelper.reservationsInDB();
  const reservationId = response.map(
    (reservation) => reservation.reservationId
  );

  expect(response).toHaveLength(
    reservationHelper.initialReservations.length + 1
  );
  expect(reservationId).toContain("bbe0b65c-e781-4bec-81ff-3555a0949b2cadded");
});

test("a reservation can be deleted", async () => {
  const reservationIdToDelete =
    reservationHelper.initialReservations[0].reservationId;
  await api
    .delete(`/api/reservations/${reservationIdToDelete}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const response = await reservationHelper.reservationsInDB();
  const reservationId = response.map(
    (reservation) => reservation.reservationId
  );

  expect(response).toHaveLength(
    reservationHelper.initialReservations.length - 1
  );
  expect(reservationId).not.toContain(reservationIdToDelete);
});

afterAll(() => {
  mongoose.connection.close();
});
