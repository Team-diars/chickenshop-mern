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

router.get("/", getCategories);

router.get("/:id", getCategory);

router.post(
  "/register",
  [check("name", "Name is required").not().isEmpty(), fieldValidation],
  registerCategory
);

router.post(
  "/update/:id",
  [check("name", "Name is required").not().isEmpty(), fieldValidation],
  updateCategory
);

router.post("/delete/:id", deleteCategory);

module.exports = router;
