const datesRouter = require("express").Router();
const Reservation = require("../models/reservation");

datesRouter.get("/:date", (request, response, next) => {
  date = new Date(request.params.date);
  Reservation.find({ reservationDate: date })
    .then((reservations) => {
      response.json(reservations);
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = datesRouter;
