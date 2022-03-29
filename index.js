const Express = require("express");
const Cors = require("cors");
const PORT = process.env.PORT || 5000;
const app = Express();
const server = require("http").Server(app);

app.use(Cors());
if (process.env.NODE_ENV === "production") {
  app.use(Express.static("build"));
  app.get("*", (req, res) => {
    req.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}
app.use("/test", (req, res) => {
  res.status(200).json({
    appName: "Server",
  });
});

server.listen(PORT, (error) => {
  if (error) {
    console.log("Error");
  } else {
    console.log("Success");
  }
});
