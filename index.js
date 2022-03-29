const Express = require("express");
const Cors = require("cors");
const PORT = process.env.PORT || 5000;
const app = Express();
const server = require("http").Server(app);

app.use(Cors());
app.get("/", (req, res) => {
  res.status(200).json({
    pathName: "/",
  });
});
app.get("/test", (req, res) => {
  res.status(200).json({
    pathName: "/test",
  });
});

server.listen(PORT, (error) => {
  if (error) {
    console.log("Error");
  } else {
    console.log("Success");
  }
});
