const reservationsRouter = require("express").Router();
const Reservation = require("../models/reservation");
const User = require("../models/user");

reservationsRouter.get("/", (request, response) => {
  Reservation.find({}).then((reservations) => {
    response.json(reservations);
  });
});

reservationsRouter.get("/:reservationId", (request, response, next) => {
  id = request.params.reservationId;
  Reservation.findOne({ reservationId: id }, function (error, docs) {
    if (error) {
      //TODO: Push to error handler
      next(error);
    } else {
      response.json(docs);
    }
  });
});

reservationsRouter.post("/", (request, response, next) => {
  const body = request.body;

  const newReservation = new Reservation({
    reservationId: body.reservationId,
    parkingSpotId: body.parkingSpotId,
    userId: body.userId,
    licensePlate: body.licensePlate,
    reservationDate: body.reservationDate,
    time: body.time,
  });

  newReservation
    .save()
    .then((savedReservation) => {
      response.json(savedReservation);
    })
    .catch((error) => {
      //TODO: Push to error handler
      next(error);
    });
});

reservationsRouter.delete("/:reservationId", (request, response, next) => {
  id = request.params.reservationId;

  Reservation.deleteOne({ reservationId: id })
    .then((result) => {
      response.json(result);
    })
    .catch((error) => {
      //TODO: Push to error handler
      next(error);
    });
});

reservationsRouter.put("/:reservationId", (request, response, next) => {
  id = request.params.reservationId;
  const body = request.body;

  const update = {
    reservationId: body.reservationId,
    parkingSpotId: body.parkingSpotId,
    userId: body.userId,
    licensePlate: body.licensePlate,
    reservationDate: body.reservationDate,
    time: body.time,
  };

  Reservation.updateOne({ reservationId: id }, update)
    .then((result) => {
      response.json(result);
    })
    .catch((error) => {
      //TODO: Push to error handler
      next(error);
    });
});

module.exports = reservationsRouter;
