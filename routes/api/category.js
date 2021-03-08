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

router.get("/",[auth], getCategories);

router.get("/:id",[auth], getCategory);

router.post(
  "/register",
  [ 
    auth,
    check("name", "Name is required").not().isEmpty(), 
    fieldValidation
  ],
  registerCategory
);

router.put(
  "/update/:id",
  [ 
    auth,
    check("name", "Name is required").not().isEmpty(), 
    fieldValidation
  ],
  updateCategory
);

router.delete("/delete/:id", [auth], deleteCategory);

module.exports = router;
