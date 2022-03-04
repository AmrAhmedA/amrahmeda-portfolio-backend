const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const verify = require("./routes/verify");
const message = require("./routes/message");
app.use(express.json());
app.use(helmet());
app.use("/api/verify", verify);
app.use("/api/message", message);

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("Morgan Enabled");
}
// app.use(function (req, res, next) {
//   console.log("Amr");
// });

app.get("/api/me", (req, res) => {
  res.status(200).send("AmrAhmedA");
});

app.listen(3001, () => console.log("Listening on port 3001..."));
