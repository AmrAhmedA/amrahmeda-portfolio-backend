const express = require("express");
const axios = require("axios");
const app = express();
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
// app.use(function (req, res, next) {
//   console.log("Amr");
// });

app.get("/api/me", (req, res) => {
  res.status(200).send("Hello world ");
});
app.post("/api/verify", async (req, res) => {
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
  const status = { data };
  res.status(200).send(status);
});

app.listen(3001, () => console.log("Listening on port 3001..."));
