const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config");
const usersRouter = require("./controllers/users");

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

app.use("/api/users", usersRouter);

module.exports = app;
