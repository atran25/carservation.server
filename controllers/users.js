const usersRouter = require("express").Router();
const User = require("../models/user");

// Returns all users
usersRouter.get("/", (request, response) => {
  User.find({}).then((users) => {
    response.json(users);
  });
});

// Returns a user matching the userId query parameter
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

// Add a new user to the database
usersRouter.post("/", async (request, response, next) => {
  const auth = request.currentUser;
  let newUser;

  if (auth) {
    newUser = new User({
      userId: request.body.uid,
      name: request.body.name,
      email: request.body.email,
      isEmployee: request.body.isEmployee,
    });

    const newUserExistsAlready = await User.exists({
      userId: request.body.uid,
    });

    //save to db if user does not exist yet
    if (!newUserExistsAlready) {
      newUser
        .save()
        .then((savedUser) => {
          response.json(savedUser);
        })
        .catch((error) => {
          next(error);
        });
    } else {
      console.log("logging in existing user");
    }
  } else {
    console.log("user not authorized");
  }
});

// Delete the user matching the userId query parameter
usersRouter.delete("/:userId", (request, response, next) => {
  id = request.params.userId;

  User.deleteOne({ userId: id })
    .then((result) => {
      response.json(result);
    })
    .catch((error) => {
      next(error);
    });
});

// Update the user matching the userId query parameter
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
      next(error);
    });
});

module.exports = usersRouter;
