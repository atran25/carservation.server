const reportsRouter = require("express").Router();
const Report = require("../models/report");
const { v4: uuidv4 } = require("uuid");

reportsRouter.get("/", (request, response) => {
  Report.find({}).then((reports) => {
    response.json(reports);
  });
});

reportsRouter.get("/:reportId", (request, response, next) => {
  id = request.params.reportId;
  User.findOne({ reportId: id }, function (error, docs) {
    if (error) {
      //TODO: Push to error handler
      next(error);
    } else {
      response.json(docs);
    }
  });
});

reportsRouter.post("/", (request, response, next) => {
  const body = request.body;

  const newReport = new Report({
    reportId: body.reportId || uuidv4(),
    reportDate: body.reportDate || new Date(),
    parkingSpotId: body.parkingSpotId,
    userId: body.userId,
  });

  newReport
    .save()
    .then((savedReport) => {
      response.json(savedReport);
    })
    .catch((error) => {
      //TODO: Push to error handler
      next(error);
    });
});

reportsRouter.delete("/:reportId", (request, response, next) => {
  const id = request.params.reportId;

  Report.deleteOne({ reportId: id })
    .then((result) => {
      response.json(result);
    })
    .catch((error) => {
      //TODO: Push to error handler
      next(error);
    });
});

reportsRouter.put("/:reportId", (request, response, next) => {
  const id = request.params.reportId;
  const body = request.body;

  const newReport = new Report({
    reportId: body.reportId,
    reportDate: body.reportDate,
    parkingSpotId: body.parkingSpotId,
    userId: body.userId,
  });

  Report.updateOne({ reportId: id }, update)
    .then((result) => {
      response.json(result);
    })
    .catch((error) => {
      //TODO: Push to error handler
      next(error);
    });
});

module.exports = reportsRouter;
