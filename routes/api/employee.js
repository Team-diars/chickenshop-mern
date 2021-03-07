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

router.get("/", getEmployees);

router.get("/:id", getEmployee);

router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("lastname", "Lastname is required").not().isEmpty(),
    check("dni", "DNI is required").not().isEmpty(),
    check("dni", "DNI length must be 8 characters").isLength({
      min: 8,
      max: 8,
    }),
    check("address", "Address is required").not().isEmpty(),
    check("email", "Email is required").not().isEmpty(),
    check("email", "The format is incorrect").isEmail(),
    fieldValidation,
  ],
  registerEmployee
);

router.post(
  "/update/:id",
  [
    check("name", "Name is required").not().isEmpty(),
    check("lastname", "Lastname is required").not().isEmpty(),
    check("dni", "DNI is required").not().isEmpty(),
    check("dni", "DNI length must be 8 characters").isLength({
      min: 8,
      max: 8,
    }),
    check("address", "Address is required").not().isEmpty(),
    check("email", "Email is required").not().isEmpty(),
    check("email", "The format is incorrect").isEmail(),
    fieldValidation,
  ],
  updateEmployee
);

router.post("/delete/:id", deleteEmployee);

module.exports = router;
