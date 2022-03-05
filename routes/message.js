const express = require("express");
const router = express.Router();
const _ = require("lodash");
const axios = require("axios");
const apiEndPoint = "https://formspree.io/f/xayvjdbj";
const yup = require("yup");

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const ContactFormValidation = yup.object().shape({
  name: yup
    .string("Please enter your name")
    .test(
      "len",
      "Name must be exactly 2 characters atleast",
      (val) => val.length > 2
    )
    .matches(
      "^[a-zA-Z_ \u0621-\u064A\u0660-\u0669]+$",
      "Please enter your name"
    )
    .max(20, "Name must be less than 20 characters")
    .required("Please enter your name"),
  phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .max(16, "Phone number must be less than 16 characters")
    .required("Please enter your phone"),
  email: yup
    .string()
    .email("Please enter your email")
    .max(20)
    .required("Please enter your email"),
  message: yup
    .string()
    .max(300, "You have reached the maximum words")
    .required("Please enter your message"),
});
router.post("/", async (req, res) => {
  if (_.isEmpty(req.query)) {
    res.status(400).send("The request is empty");
    return;
  }
  try {
    await ContactFormValidation.validate(req.query, {
      abortEarly: false,
    });
  } catch (ex) {
    console.log(ex.inner);
    const errors = {};
    for (let item of ex.inner) errors[item.path] = item.errors[0];
    console.log(errors);
    res.status(400).send(errors);
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
