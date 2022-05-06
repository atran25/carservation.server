const requestLogger = (request, response, next) => {
  if (process.env.NODE_ENV !== "test") {
    console.log("Method:", request.method);
    console.log("Path:", request.path);
    console.log("Body:", request.body);
    console.log("------");
  }
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  if (process.env.NODE_ENV !== "test") {
    console.error(error.message);
  }
  // console.error(error.name);

  if (error.name === "CastError") {
    return response.status(400).send({ error: error.message });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "nonexistingError") {
    return response.status(404).json({ error: error.message });
  } else if (error.name === "URIError") {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
