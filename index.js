const express = require("express");
const axios = require("axios");
const app = express();
const apiEndPoint =
  "https://cors-anywhere.herokuapp.com/https://www.google.com/recaptcha/api/siteverify";
app.use(express.json());
// app.use(function (req, res, next) {
//   console.log("Amr");
// });

app.get("/api/me", (req, res) => {
  res.status(200).send("Hello world ");
});
app.post("/api/verify", (req, res) => {
  res.status(200).send("Hello world ");
  axios({
    method: "post",
    url: apiEndPoint,
    params: params,
    headers: axiosConfig,
  });
});

app.listen(3001, () => console.log("Listening on port 3001..."));
