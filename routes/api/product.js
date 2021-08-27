const express = require("express");
const router = express.Router();
const Product = require("../../models/Product");
const { check, validationResult } = require("express-validator/check");
const auth = require("../../middleware/auth");
const { route } = require("./sale");
const { editProduct } = require("../../controller/product");
const { fieldValidation } = require("../../middleware/fieldValidation");
require("colors");


//* @route  GET api/product/search/:category
//* @des    Get product by category
//* @access Public
router.get('/search/:category',async(req,res)=>{
  try{
    let {category} = req.params;
    
    const products = await Product.find({category}).exec();
    if (!products) return res.status(500).send('Category does not exist')
    res.json(products);
  }catch(e){
    res.status(500).send("Server error");
  }
})


//* @route  GET api/product
//* @des    Get all products
//* @access Private
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({ status: 1 }).sort({date: -1}).exec();
    return res.json(products);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

//* @route  GET api/product/:id
//* @des    Get product by ID
//* @access Private
router.get("/:id", [auth], async (req, res) => {
  try {
    const {id} = req.params;
    const product = await Product.find({ _id:id, status: 1 }).exec();
    return res.json(product[0]);
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
      // check("price", "Price must be number").not().isString(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { category, image, name, price } = req.body;

    //* Validate if product exists
    let product = await Product.findOne({ name });
    if (product && product.status === 1) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Product already exists" }] });
    }
    const exists = await Product.exists({ name: name, status: 0 });
    if (exists) {
      const product = await Product.findOneAndUpdate({ name },{ category:category.toLowerCase(), price,image, status: 1 });
      return res.json(product);
    }
    const newProduct = new Product({ category:category.toLowerCase(), name:name.trim(), price, image });
    await newProduct.save();
    return res.json(newProduct);  
  }
);

//* @route  DELETE api/product/delete/:id
//* @des    Updating state
//* @access Private
router.delete("/delete/:id", [auth], async (req, res) => {
  try {
    const { id } = req.params;
    const exists = await Product.find({ _id: id, status: 1 });
    
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

//* @route  PUT api/product
//* @des    Updating product by ID
//* @access Private
router.put(
  "/edit/:id",
  [
    auth,
    [check("category", "Category is required").not().isEmpty()],
    [check("name", "Name is required").not().isEmpty(),
    check("name", "Name must be text").not().isNumeric()],
    [check("price", "Price is required").not().isEmpty(),check("price", "Price must be number").not().isString()],
    // fieldValidation,
  ],
  async(req,res) => {
    try{
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array()
        }); //* mapped() returns object
      }
      const { id } = req.params;
      const { category, name, price } = req.body;
      const exists = await Product.exists({ _id: id, status: 1 });
      if (!exists) return res.status(500).send("Product doesn't exist");
      const duplicatedProduct = await Product.exists({ name: name, status: 0 });
      const isSameProduct = await Product.exists({_id:id,name});
      const isThereAnyProduct = await Product.exists({ name, status: 1 });
      if (duplicatedProduct) {
        await Product.findByIdAndRemove(id);
        const productUpdated = await Product.findOneAndUpdate({ name, status:0 },{ name:name.trim(),category:category.toLowerCase(), status: 1 });
        return res.json(productUpdated);
      }else{
        if(isThereAnyProduct && !isSameProduct){
          return res.status(500).json({
            errors: [{msg:`There is an product with the same name registered`}]
          });
        }
      }
      const productUpdated = await Product.findByIdAndUpdate(id,
                                            { category:category.toLowerCase(), name:name.trim(), price },
                                            { new: true });
      return res.json(productUpdated);
    }catch(error){
      if (error.code === 11000) return res.status(500).send("Product duplicated");
      return res.status(500).send("Server error");
    }
  }
);

module.exports = router;
