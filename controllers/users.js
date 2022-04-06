const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", (request, response) => {
  User.find({}).then((users) => {
    response.json(users);
  });
});

usersRouter.get("/:userId", (request, response) => {
  id = request.params.userId;
  User.findOne({ userId: id }, function (error, docs) {
    if (error) {
      //TODO: Push to error handler
    } else {
      response.json(docs);
    }
  });
});

usersRouter.post("/", (request, response) => {
  const body = request.body;

  const newUser = new User({
    userId: body.userId,
    name: body.name,
    email: body.email,
    reservations: body.reservations,
    isEmployee: body.isEmployee,
  });

  newUser
    .save()
    .then((savedUser) => {
      response.json(savedUser);
    })
    .catch((error) => {
      //TODO: Push to error handler
    });
});

usersRouter.delete("/:userId", (request, response) => {
  id = request.params.userId;

  User.deleteOne({ userId: id })
    .then((result) => {
      response.json(result);
    })
    .catch((error) => {
      //TODO: Push to error handler
    });
});

usersRouter.put("/:userId", (request, response) => {
  id = request.params.userId;
  const body = request.body;

  const update = {
    userId: body.userId,
    name: body.name,
    email: body.email,
    reservations: body.reservations,
    isEmployee: body.isEmployee,
  };

  User.updateOne({ userId: id }, update)
    .then((result) => {
      response.json(result);
    })
    .catch((error) => {
      //TODO: Push to error handler
    });
});

module.exports = usersRouter;
