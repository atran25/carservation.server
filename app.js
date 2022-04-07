const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config");
const middleware = require("./utils/middleware");
const usersRouter = require("./controllers/users");
const reservationsRouter = require("./controllers/reservations");
const datesRouter = require("./controllers/dates");
const decodeIDToken = require('./authenticateToken')


mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB: ", error.message);
  });

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/", decodeIDToken);
app.use("/api/users", usersRouter);
app.use("/api/reservations", reservationsRouter);
app.use("/api/dates", datesRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
