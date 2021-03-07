const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const {
  getEmployees,
  getEmployee,
  registerEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../../controller/employee");
const { fieldValidation } = require("../../middleware/fieldValidation");

//* @route  GET api/employee
//* @des    Test Route
//* @access Private
router.get("/", getEmployees);

//* @route  GET api/employee/:id
//* @des    Test Route
//* @access Private
router.get("/:id", getEmployee);

//* @route  POST api/employee/register
//* @des    Test Route
//* @access Private
router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("lastname", "Lastname is required").not().isEmpty(),
    check("address", "Address is required").not().isEmpty(),
  ],
  [
    check("dni", "DNI is required").not().isEmpty(),
    check("dni", "DNI length must be 8 characters").isLength({
      min: 8,
      max: 8,
    }),
  ],
  [
    check("email", "Email is required").not().isEmpty(),
    check("email", "The format is incorrect").isEmail(),
  ],
  fieldValidation,
  registerEmployee
);

//* @route  PUT api/employee/update/:id
//* @des    Test Route
//* @access Private
router.put(
  "/update/:id",
  [
    check("name", "Name is required").not().isEmpty(),
    check("lastname", "Lastname is required").not().isEmpty(),
    check("address", "Address is required").not().isEmpty(),
  ],
  [
    check("dni", "DNI is required").not().isEmpty(),
    check("dni", "DNI length must be 8 characters").isLength({
      min: 8,
      max: 8,
    }),
  ],
  [
    check("email", "Email is required").not().isEmpty(),
    check("email", "The format is incorrect").isEmail(),
  ],
  fieldValidation,
  updateEmployee
);

//* @route  DELETE api/employee/delete/:id
//* @des    Test Route
//* @access Private
router.delete("/delete/:id", deleteEmployee);

module.exports = router;
