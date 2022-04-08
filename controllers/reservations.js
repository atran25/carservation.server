const reservationsRouter = require("express").Router();
const Reservation = require("../models/reservation");

reservationsRouter.get("/", (request, response) => {
  Reservation.find({}).then((reservations) => {
    response.json(reservations);
  });
});

reservationsRouter.get(
  "/reservationId/:reservationId",
  (request, response, next) => {
    const id = request.params.reservationId;
    Reservation.findOne({ reservationId: id }, function (error, docs) {
      if (error) {
        //TODO: Push to error handler
        next(error);
      } else {
        response.json(docs);
      }
    });
  }
);

reservationsRouter.get("/date/:date", (request, response, next) => {
  date = new Date(request.params.date);
  Reservation.find({ reservationDate: date })
    .then((reservations) => {
      response.json(reservations);
    })
    .catch((error) => {
      next(error);
    });
});

reservationsRouter.get(
  "/parkingSpotId/:parkingSpotId",
  (request, response, next) => {
    id = request.params.parkingSpotId;
    Reservation.find({ parkingSpotId: id })
      .then((reservations) => {
        response.json(reservations);
      })
      .catch((error) => {
        next(error);
      });
  }
);

reservationsRouter.get("/userId/:userId", (request, response, next) => {
  id = request.params.userId;
  Reservation.find({ userId: id })
    .then((reservations) => {
      response.json(reservations);
    })
    .catch((error) => {
      next(error);
    });
});

reservationsRouter.post("/", (request, response, next) => {
  const body = request.body;

  const newReservation = new Reservation({
    reservationId: body.reservationId,
    parkingSpotId: body.parkingSpotId,
    userId: body.userId,
    licensePlate: body.licensePlate,
    reservationDate: new Date(body.reservationDate),
    time: body.time,
    isCheckedIn: body.isCheckedIn || false,
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
  const id = request.params.reservationId;

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
  const id = request.params.reservationId;
  const body = request.body;

  const update = {
    reservationId: body.reservationId,
    parkingSpotId: body.parkingSpotId,
    userId: body.userId,
    licensePlate: body.licensePlate,
    reservationDate: new Date(body.reservationDate),
    time: body.time,
    isCheckedIn: body.isCheckedIn || false,
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
