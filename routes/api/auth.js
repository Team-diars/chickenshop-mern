const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check } = require("express-validator/check");
const { fieldValidation } = require("../../middleware/fieldValidation");
const { GetUserInfo, Login } = require("../../controller/auth");

//* @route  GET api/auth
//* @des    Get User Info
//* @access Public
router.get("/", auth, GetUserInfo);

//* @route  POST api/auth
//* @des    Authenticate user & get token
//* @access Public
router.post(
  "/",
  [
    [
      check("email", "Email is required").not().isEmpty(),
      check("email", "Please include a valid email").isEmail(),
    ],
    check("password", "Password is required").not().isEmpty(),
    fieldValidation,
  ],
  Login
);

module.exports = router;
