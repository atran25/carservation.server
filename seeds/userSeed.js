const mongoose = require("mongoose");
const config = require("../utils/config");
const User = require("../models/user")

mongoose.connect(config.MONGODB_URI)
.then(() => {
    console.log("Connected to MongoDB and will now seed user collection");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB: ", error.message);
  });

//clear all current users
User.deleteMany({})
.then((p) => {
    console.log(p)
})
.catch(err => {
    console.log(err)
})  

const users = [

    {
        userID: 13579,
        name: "Bob Joe",
        email: "BobJoe@gmail.com",
        reservations: [2],
        isEmployee: false
    }

]

User.insertMany(users)
    .then((p) => {
        console.log(p)
    })
    .catch(err => {
        console.log(err)
    })