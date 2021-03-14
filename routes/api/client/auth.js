const express = require("express");
const router = express.Router();
const { check } = require("express-validator/check");
const {
  Login,
  RegisterAccount,
  GetUserData,
} = require("../../../controller/client/auth");
const { checkPasswordFormat } = require("../../../lib/checkPasswordFormat");
const auth = require("../../../middleware/client/auth");
const { fieldValidation } = require("../../../middleware/fieldValidation");
const asyncHandler = require('express-async-handler');
const UserClient = require("../../../models/client/UserClient");

//* @route  GET api/client
//* @des    Get all clients
//* @access Private
router.get('/',asyncHandler(async(req,res)=>{
  const clients = await UserClient.find().exec();
  return res.json(clients)
}))

//* @route  POST api/client/auth
//* @des    Authenticate user & get token
//* @access Public
router.post(
  "/auth",
  [
    [
      check("email", "Email is required").not().isEmpty(),
      check("email", "Please enter a valid email").isEmail(),
    ],
    check("password", "Password is required").not().isEmpty(),
    fieldValidation,
  ],
  Login
);

//* @route  POST api/client/register
//* @des    Register user & get token
//* @access Public
router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    [
      check("email", "Email is required").not().isEmpty(),
      check("email", "Please enter a valid email").isEmail(),
    ],
    [
      check(
        "password",
        "Please enter a password with 6 or more characters"
      ).isLength({ min: 6 }),
      check("password", "Password is required").not().isEmpty(),
      check(
        "password",
        "Password must have lowerCase, upperCase and numbers"
      ).custom(checkPasswordFormat),
    ],
    fieldValidation,
  ],
  RegisterAccount
);

//* @route  GET api/client/
//* @des    Get User Info
//* @access Private
router.get("/", auth, GetUserData);

module.exports = router;
