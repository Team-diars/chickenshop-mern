const express = require('express');
const router = express.Router();
const Order = require("../../models/Order");

// @route  GET api/menu
// @des    Send Menu Order
// @access Public
router.post('/', async (req,res) => { 
  const {products} = req.body;
  if(!products) return;
  let unique_creams = [];
  // products.forEach((item) => {
  //   unique_creams.push(...item.creams);
  // })
  // unique_creams = [...new Set(unique_creams)]; // All unique creams
  const newOrder = new Order({ products });
  // console.log("Order: ",newOrder);
  await newOrder.save();
  return res.json(newOrder);
})

module.exports = router;