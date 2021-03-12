const express = require("express");
const router = express.Router();
const Product = require("../../models/Product");
const { check, validationResult } = require("express-validator/check");
const auth = require("../../middleware/auth");
const { route } = require("./sale");
const { editProduct } = require("../../controller/product");
const { fieldValidation } = require("../../middleware/fieldValidation");
require("colors");

//* @route  GET api/product
//* @des    Get all products
//* @access Private

router.get("/", [auth], async (req, res) => {
  try {
    const products = await Product.find({ status: 1 }).exec();
    return res.json(products);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

//* @route  POST api/product
//* @des    Register product
//* @access Private
router.post(
  "/",
  [
    auth,
    [check("category", "Category is required").not().isEmpty()],
    [
      check("name", "Name is required").not().isEmpty(),
      check("name", "Name must be text").not().isNumeric(),
    ],
    [
      check("price", "Price is required").not().isEmpty(),
      check("price", "Price must be number").not().isString(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { category, name, price } = req.body;

    //* Validate if product exists
    let product = await Product.findOne({ name });
    console.log("product".green, product);
    if (product && product.status === 1) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Product already exists" }] });
    }

    const exists = await Product.exists({ name: name, status: 0 });
    if (exists) {
      await Product.findOneAndUpdate(
        { name, category, price },
        { name, status: 1 }
      );
      return res.json({
        status: "Product created successfully",
      });
    }
    const newProduct = new Product({ category, name, price });
    await newProduct.save();
    return res.json({
      status: "Product created successfully",
    });
  }
);

//* @route  PUT api/product/delete/:id
//* @des    Updating state
//* @access Private
router.delete("/delete/:id", [auth], async (req, res) => {
  try {
    const { id } = req.params;
    const exists = await Product.find({ _id: id, status: 1 });
    console.log("id".red, exists);
    if (exists.length === 0 || !exists) {
      return res.status(500).send("Product not found");
    }
    await Product.findByIdAndUpdate(id, { status: 0 }, { new: true });
    return res.json({
      status: "Product removed successfully",
    });
  } catch (error) {
    return res.status(500).send("Server error");
  }
});

router.put(
  "/edit/:id",
  [
    auth,
    [
      check("category", "Category is required").not().isEmpty(),
    ],
    [
      check("name", "Name is required").not().isEmpty(),
      check("name", "Name must be text").not().isNumeric(),
    ],
    [
      check("price", "Price is required").not().isEmpty(),
      check("price", "Price must be number").not().isString(),
    ],
    fieldValidation,
  ],
  editProduct
);

module.exports = router;
