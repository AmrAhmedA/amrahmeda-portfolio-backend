const express = require("express");
const router = express.Router();
const _ = require("lodash");
const axios = require("axios");
const apiEndPoint = "https://www.google.com/recaptcha/api/siteverify";
const gCaptchaSecretKey = "6LeNloweAAAAAK_ngbhSQtPj8_RmnvQBfyx29AB8";
const axiosConfig = {
  "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true,
  // withCredentials: false,
  "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
};
router.post("/", async (req, res) => {
  if (_.isEmpty(req.query)) {
    res.status(400).send("The request is empty, please add user response");
    return;
  }
  if (
    req.query["userResponse"] == undefined ||
    _.isEmpty(req.query["userResponse"])
  ) {
    res.status(400).send("User response not found");
    return;
  }
  const { userResponse } = req.query;
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
    return;
  }
  res.status(200).send(data);
});
module.exports = router;
