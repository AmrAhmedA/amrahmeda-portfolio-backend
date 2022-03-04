const express = require("express");
const axios = require("axios");
const helmet = require("helmet");
const app = express();
const morgan = require("morgan");
const _ = require("lodash");
const apiEndPoint = "https://www.google.com/recaptcha/api/siteverify";
const gCaptchaSecretKey = "6LeNloweAAAAAK_ngbhSQtPj8_RmnvQBfyx29AB8";
const axiosConfig = {
  "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true,
  // withCredentials: false,
  "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
};
app.use(express.json());
app.use(helmet());
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("Morgan Enabled");
}
// app.use(function (req, res, next) {
//   console.log("Amr");
// });

app.get("/api/me", (req, res) => {
  res.status(200).send("Hello world ");
});
app.post("/api/verify", async (req, res) => {
  if (_.isEmpty(req.body)) {
    res.status(400).send("The request is empty, please add user response");
    return;
  }
  if (
    req.body["userResponse"] == undefined ||
    _.isEmpty(req.body["userResponse"])
  ) {
    res.status(400).send("User response not found");
    return;
  }
  const { userResponse } = req.body;
  let params = { secret: gCaptchaSecretKey, response: userResponse };
  try {
    var { data } = await axios({
      method: "post",
      url: apiEndPoint,
      params: params,
      headers: axiosConfig,
    });
  } catch (error) {
    console.log("Errors: ", error);
  }
  res.status(200).send(data);
});

app.listen(3001, () => console.log("Listening on port 3001..."));
