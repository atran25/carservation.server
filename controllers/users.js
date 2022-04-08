const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", (request, response) => {
  User.find({}).then((users) => {
    response.json(users);
  });
});

usersRouter.get("/:userId", (request, response, next) => {
  id = request.params.userId;
  User.findOne({ userId: id }, function (error, docs) {
    if (error) {
      //TODO: Push to error handler
      next(error);
    } else {
      response.json(docs);
    }
  });
});

usersRouter.post("/", (request, response, next) => {

const auth = request.currentUser;
let newUser;

  if (auth) {
    newUser = new User({
      userId: request.body.uid,
      name: request.body.name,
      email: request.body.email,
      isEmployee: request.body.isEmployee
    });
  }

  if (newUser) {
    newUser
    .save()
    .then((savedUser) => {
      response.json(savedUser);
    })
    .catch((error) => {
      //TODO: Push to error handler
      next(error);
    });
  }

  else {
    console.log("user not authorized")
  }

});

usersRouter.delete("/:userId", (request, response, next) => {
  id = request.params.userId;

  User.deleteOne({ userId: id })
    .then((result) => {
      response.json(result);
    })
    .catch((error) => {
      //TODO: Push to error handler
      next(error);
    });
});

usersRouter.put("/:userId", (request, response, next) => {
  id = request.params.userId;
  const body = request.body;

  const update = {
    userId: body.userId,
    name: body.name,
    email: body.email,
    isEmployee: body.isEmployee,
  };

  User.updateOne({ userId: id }, update)
    .then((result) => {
      response.json(result);
    })
    .catch((error) => {
      //TODO: Push to error handler
      next(error);
    });
});

module.exports = usersRouter;
