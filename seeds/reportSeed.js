const mongoose = require("mongoose");
const config = require("../utils/config");
const Report = require("../models/report")

mongoose.connect(config.MONGODB_URI)
.then(() => {
    console.log("Connected to MongoDB and will now seed report collection");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB: ", error.message);
  });

//clear all current reports
Report.deleteMany({})
.then((p) => {
    console.log(p)
})
.catch(err => {
    console.log(err)
})  

const reports = [

    {
        parkingSpotId: 1,
        userId: 13579,
        offenderId: 2364,
        offenderLicensePlate: "RIDJ284"
    }

]

Report.insertMany(reports)
    .then((p) => {
        console.log(p)
    })
    .catch(err => {
        console.log(err)
    })