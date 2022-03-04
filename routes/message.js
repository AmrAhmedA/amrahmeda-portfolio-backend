const express = require("express");
const router = express.Router();
const _ = require("lodash");
const axios = require("axios");
const apiEndPoint = "https://formspree.io/f/xayvjdbj";
const axiosConfig = {
  "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true,
  // withCredentials: false,
  "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
};
router.post("/", async (req, res) => {
  if (_.isEmpty(req.query)) {
    res.status(400).send("The request is empty");
    return;
  }

  const { name, phone, email, message } = req.query;
  let form = { name: name, phone: phone, email: email, message: message };
  try {
    var { data } = await axios.post(apiEndPoint, form);
    console.log(data);
  } catch (error) {
    console.log("Errors: ", error);
    res.status(404).send(error);
    return;
  }
  res.status(200).send(data);
});
module.exports = router;
