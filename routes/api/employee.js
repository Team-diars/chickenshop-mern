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
const auth = require('../../middleware/auth');
const { fieldValidation } = require("../../middleware/fieldValidation");

//* @route  GET api/employee
//* @des    Get all employees
//* @access Private
router.get("/", getEmployees);

//* @route  GET api/employee/:id
//* @des    Get employee by ID
//* @access Private
router.get("/:id",[auth], getEmployee);

//* @route  POST api/employee/register
//* @des    Register new employee
//* @access Private
router.post(
  "/register",
  [ 
    auth,
    check("name", "Name is required").not().isEmpty(),
    check("lastname", "Lastname is required").not().isEmpty(),
    check("address", "Address is required").not().isEmpty(),
    [
      check("dni", "DNI is required").not().isEmpty(),
      check("dni", "DNI length must be 8 characters").isLength({
        min: 8,
        max: 8,
      }),
    ],
    [
      check("email", "Email is required").not().isEmpty(),
      check("email", "Must be a valid email").isEmail(),
    ],
  ],
  fieldValidation,
  registerEmployee
);

//* @route  PUT api/employee/update/:id
//* @des    Updating employee by ID
//* @access Private
router.put(
  "/update/:id",
  [
    auth,
    check("name", "Name is required").not().isEmpty(),
    check("lastname", "Lastname is required").not().isEmpty(),
    [
      check("email", "Email is required").not().isEmpty(),
      check("email", "Must be a valid email").isEmail(),
    ],
    [
      check("dni", "DNI is required").not().isEmpty(),
      check("dni", "DNI length must be 8 characters").isLength({
        min: 8,
        max: 8,
      })
    ],
    check("address", "Address is required").not().isEmpty(),
  ],
  fieldValidation,
  updateEmployee
);

//* @route  DELETE api/employee/delete/:id
//* @des    Delete employee by ID
//* @access Private
router.delete("/delete/:id",[auth], deleteEmployee);

module.exports = router;
