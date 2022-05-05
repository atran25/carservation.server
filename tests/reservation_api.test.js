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

test("initial reservations were added", async () => {
  const response = await api.get("/api/reservations");
  const reservationsIds = response.body.map(
    (reservations) => reservations.reservationId
  );

  for (let reservation of reservationHelper.initialReservations) {
    expect(reservationsIds).toContain(reservation.reservationId);
  }
});

test("reservations are returned as JSON objects", async () => {
  await api
    .get("/api/reservations")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all reservations are returned", async () => {
  const response = await api.get("/api/reservations");
  expect(response.body).toHaveLength(
    reservationHelper.initialReservations.length
  );
});

test("a specific reservation can be viewed using the reservationId", async () => {
  const reservationToView = reservationHelper.initialReservations[0];
  const reservationIdToView = reservationToView.reservationId;

  const response = await api
    .get(`/api/reservations/reservationId/${reservationIdToView}`)
    .expect("Content-Type", /application\/json/);

  const reservationResponse = response.body;
  expect(reservationResponse.reservationId).toContain(
    reservationToView.reservationId
  );
  expect(reservationResponse.userId).toContain(reservationToView.userId);
  expect(reservationResponse.licensePlate).toContain(
    reservationToView.licensePlate
  );
  expect(reservationResponse.reservationDate).toContain(
    reservationToView.reservationDate
  );
  expect(reservationResponse.time).toEqual(reservationToView.time);
  expect(reservationResponse.isCheckedIn).toBe(reservationToView.isCheckedIn);
});

test("specific reservations can be viewed using the date", async () => {
  const reservationToView = reservationHelper.initialReservations[0];
  const reservationDateToView = reservationToView.reservationDate;

  const response = await api
    .get(`/api/reservations/date/${reservationDateToView}`)
    .expect("Content-Type", /application\/json/);

  // Loop through the initial reservations and if they are equal to the reservation date, add 1 to the counter
  let initialReservationsWithCertainDate =
    reservationHelper.initialReservations.reduce((sum, reservation) => {
      return reservation.reservationDate === reservationDateToView
        ? sum + 1
        : sum;
    }, 0);

  const reservationResponse = response.body;
  expect(reservationResponse).toHaveLength(initialReservationsWithCertainDate);
  for (let reservation of response.body) {
    expect(reservation.reservationDate).toContain(reservationDateToView);
  }
});

test("specific reservations can be viewed between a start and end date", async () => {
  await api
    .get("/api/reservations")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("specific reservations can be viewed using the userId", async () => {
  const reservationToView = reservationHelper.initialReservations[0];
  const reservationUserIdToView = reservationToView.userId;

  const response = await api
    .get(`/api/reservations/userId/${reservationUserIdToView}`)
    .expect("Content-Type", /application\/json/);

  // Loop through the initial reservations and if they are equal to the reservation date, add 1 to the counter
  let initialReservationsWithUserId =
    reservationHelper.initialReservations.reduce((sum, reservation) => {
      return reservation.userId === reservationUserIdToView ? sum + 1 : sum;
    }, 0);

  const reservationResponse = response.body;
  expect(reservationResponse).toHaveLength(initialReservationsWithUserId);
  for (let reservation of response.body) {
    expect(reservation.userId).toContain(reservationUserIdToView);
  }
});

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

test("a duplicate reservation will not be added", async () => {
  const dupeReservation = reservationHelper.initialReservations[0];

  await api.post("/api/reservations").send(dupeReservation);

  const response = await reservationHelper.reservationsInDB();
  const reservationId = response.map(
    (reservation) => reservation.reservationId
  );

  expect(response).toHaveLength(reservationHelper.initialReservations.length);
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

test("a reservation can be updated", async () => {
  const newReservation = {
    reservationId: "bbe0b65c-e781-4bec-81ff-3555a0949b2caddedupdated",
    parkingSpotId: "A",
    userId: "RG2prv7v6whlSantpYOGijyg8eH3newuser",
    licensePlate: "43420",
    reservationDate: "2023-05-25",
    time: 23,
    isCheckedIn: true,
  };
  const reservationToReplace = reservationHelper.initialReservations[0];
  await api
    .put(`/api/reservations/${reservationToReplace.reservationId}`)
    .send(newReservation)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const response = await reservationHelper.reservationsInDB();

  expect(response).toHaveLength(reservationHelper.initialReservations.length);

  const updatedReservation = await api.get(
    `/api/reservations/reservationId/${newReservation.reservationId}`
  );
  expect(updatedReservation.body.reservationId).toContain(
    newReservation.reservationId
  );
  expect(updatedReservation.body.userId).toContain(newReservation.userId);
  expect(updatedReservation.body.licensePlate).toContain(
    newReservation.licensePlate
  );
  expect(updatedReservation.body.reservationDate).toContain(
    newReservation.reservationDate
  );
  expect(updatedReservation.body.time).toEqual(newReservation.time);
  expect(updatedReservation.body.isCheckedIn).toBe(newReservation.isCheckedIn);
});

afterAll(() => {
  mongoose.connection.close();
});
