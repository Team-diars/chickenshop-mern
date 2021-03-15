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
const auth = require('../../middleware/auth');
const { fieldValidation } = require("../../middleware/fieldValidation");

//* @route  GET api/category
//* @des    Getting all categories
//* @access Private
router.get("/",[auth], getCategories);

//* @route  GET api/category/:id
//* @des    Get category by ID
//* @access Private
router.get("/:id",[auth], getCategory);

//* @route  POST api/category/register
//* @des    Register new category
//* @access Private
router.post(
  "/register",
  [ 
    auth,
    check("name", "Name is required").not().isEmpty(), 
    fieldValidation
  ],
  registerCategory
);

//* @route  PUT api/category/update/:id
//* @des    Updating category
//* @access Private
router.put(
  "/update/:id",
  [ 
    auth,
    check("name", "Name is required").not().isEmpty(), 
    fieldValidation
  ],
  updateCategory
);

//* @route  DELETE api/category/delete/:id
//* @des    Delete category
//* @access Private
router.delete("/delete/:id",[auth], deleteCategory);

module.exports = router;
