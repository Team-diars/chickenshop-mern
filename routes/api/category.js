const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const {
  getCategories,
  getCategory,
  registerCategory,
  updateCategory,
  deleteCategory,
} = require("../../controller/category");
const { fieldValidation } = require("../../middleware/fieldValidation");

//* @route  GET api/category
//* @des    Test Route
//* @access Private
router.get("/", getCategories);

//* @route  GET api/category/:id
//* @des    Test Route
//* @access Private
router.get("/:id", getCategory);

//* @route  POST api/category/register
//* @des    Test Route
//* @access Private
router.post(
  "/register",
  [check("name", "Name is required").not().isEmpty(), fieldValidation],
  registerCategory
);

//* @route  PUT api/category/update/:id
//* @des    Test Route
//* @access Private
router.put(
  "/update/:id",
  [check("name", "Name is required").not().isEmpty(), fieldValidation],
  updateCategory
);

//* @route  DELETE api/category/delete/:id
//* @des    Test Route
//* @access Private
router.delete("/delete/:id", deleteCategory);

module.exports = router;
