const express = require("express");
const router = express.Router();
const { check } = require("express-validator/check");
const auth = require("../../middleware/auth");
const {
  GetAllUser,
  RegisterUser,
  SelectUserbyId,
  UpdateUser,
  DeleteUser,
} = require("../../controller/user");
const { fieldValidation } = require("../../middleware/fieldValidation");
const { checkPasswordFormat } = require("../../lib/checkPasswordFormat");

//* @route  POST api/user
//* @des    Register User
//* @access Public
router.post(
  "/",
  [
    check("employee", "Employee is required").not().isEmpty(),
    [
      check(
        "password",
        "Please enter a password with 6 or more characters"
      ).isLength({
        min: 6,
      }),
      check(
        "password",
        "Password must contain at least one letter or number"
      ).custom(checkPasswordFormat),
    ],
    fieldValidation,
  ],
  RegisterUser
);

//* @route  GET api/user
//* @des    Get all Users
//* @access Private
router.get("/", auth, GetAllUser);

//* @route  GET api/user
//* @des    Get User by id
//* @access Private
router.get("/:id", auth, SelectUserbyId);

router.put(
  "/update/:id",
  [
    auth,
    check("password", "Please enter your current password").not().isEmpty(),
    [
      check(
        "newpassword",
        "Please enter a password with 6 or more characters"
      ).isLength({
        min: 6,
      }),
      check(
        "newpassword",
        "Password must contain at least one letter or number"
      ).custom(checkPasswordFormat),
      fieldValidation,
    ],
  ],
  UpdateUser
);

router.delete("/delete/:id", auth, DeleteUser);

module.exports = router;
