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

describe("a specific reservation can be viewed using the reservationId", () => {
  test("succceeds with a valid reservationId", async () => {
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

  test("fails with statuscode 404 if reservationId doesn't exist", async () => {
    const validNonexistingId =
      "19ed3897-44af-4fdb-84a2-56fa5a781982new2fakedoesnotexist";
    const response = await api
      .get(`/api/reservations/reservationId/${validNonexistingId}`)
      .expect(404);
  });

  test("fails with statuscode 400 if reservationId is invalid", async () => {
    const invalidId = "54327746&%";
    const response = await api
      .get(`/api/reservations/reservationId/${invalidId}`)
      .expect(400);
  });
});

describe("specific reservations can be viewed using the date", () => {
  test("succceeds when using a valid date", async () => {
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
    expect(reservationResponse).toHaveLength(
      initialReservationsWithCertainDate
    );
    for (let reservation of response.body) {
      expect(reservation.reservationDate).toContain(reservationDateToView);
    }
  });

  test("fails with statuscode 404 if no reservation with date exists", async () => {
    const reservationDateToView = "2022-05-19";
    const response = await api
      .get(`/api/reservations/date/${reservationDateToView}`)
      .expect(404);
  });

  test("fails with statuscode 400 if date is invalid", async () => {
    const reservationDateToView = "2022-05-52";
    const response = await api
      .get(`/api/reservations/date/${reservationDateToView}`)
      .expect(400);
  });
});

describe("specific reservations can be viewed between a start and end date", () => {
  test("succeeds when using a valid start and end date ", async () => {
    const startDate = "2022-04-18";
    const startDateTime = new Date(startDate).getTime();

    const endDate = "2022-04-20";
    const endDateTime = new Date(endDate).getTime();

    const response = await api
      .get(`/api/reservations/date/${startDate}/${endDate}`)
      .expect("Content-Type", /application\/json/);

    // Loop through the initial reservations and if they are >= startDate and < endDate, add 1 to the counter
    let initialReservationsBetweenDates =
      reservationHelper.initialReservations.reduce((sum, reservation) => {
        const currentReservationDate = reservation.reservationDate;
        const currentReservationDateTime = new Date(
          currentReservationDate
        ).getTime();
        return currentReservationDateTime >= startDateTime &&
          currentReservationDateTime < endDateTime
          ? sum + 1
          : sum;
      }, 0);
    expect(response.body).toHaveLength(initialReservationsBetweenDates);
  });

  test("fails with statuscode 400 if date is invalid", async () => {
    const startDate = "2022-04-51";
    const endDate = "2022-04-20";

    const response = await api
      .get(`/api/reservations/date/${startDate}/${endDate}`)
      .expect(400);
  });
});

describe("specific reservations can be viewed using the userId", () => {
  test("succeds with valid userid", async () => {
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

  test("fails with statuscode 404 if no reservation with userId exists", async () => {
    const nonexistingUserId = "RG2prv7v6whlSantpYOGijyg8eH3nonexisting";
    const response = await api
      .get(`/api/reservations/userId/${nonexistingUserId}`)
      .expect(404);
  });

  test("fails with statuscode 400 if date is invalid", async () => {
    const invalidId = "RG2prv7v6whlSantpYOGijyg8eH3nonexisting%$#%#$&";
    const response = await api
      .get(`/api/reservations/userId/${invalidId}`)
      .expect(400);
  });
});

test("all checked in reservations are returned", async () => {
  const response = await api.get("/api/reservations/checkedIn");

  // Loop through the initial reservations and if they are equal to the reservation date, add 1 to the counter
  let initialReservationsCheckedIn =
    reservationHelper.initialReservations.reduce((sum, reservation) => {
      return reservation.isCheckedIn === true ? sum + 1 : sum;
    }, 0);

  expect(response.body).toHaveLength(initialReservationsCheckedIn);
});

describe("a reservation can be added", () => {
  test("a valid reservation is added successfully", async () => {
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
    expect(reservationId).toContain(
      "bbe0b65c-e781-4bec-81ff-3555a0949b2cadded"
    );
  });

  test("an invalid reservation returns an error", async () => {
    const newReservation = {
      reservationId: "bbe0b65c-e781-4bec-81ff-3555a0949b2cadded$#@$",
      parkingSpotId: "A$#@$@#",
      userId: "RG2prv7v6whlSantpYOGijyg8eH3n%$%$ewuser",
      licensePlate: "4342%$%#0",
      reservationDate: "2023-05-66",
      time: 23,
      isCheckedIn: true,
    };

    await api.post("/api/reservations").send(newReservation).expect(400);
  });
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
