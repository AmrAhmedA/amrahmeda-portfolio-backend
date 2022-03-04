const express = require("express");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const verify = require("./routes/verify");
const message = require("./routes/message");
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use("/api/verify", verify);
app.use("/api/message", message);

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("Morgan Enabled");
}
// app.use(function (req, res, next) {
//   console.log("Amr");
// });

app.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  );
});
app.get("/api/me", (req, res) => {
  res.status(200).send("AmrAhmedA");
});

app.listen(3001, () => console.log("Listening on port 3001..."));
