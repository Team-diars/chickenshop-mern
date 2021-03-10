const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const Sale = require('../../models/Sale'); 
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Product = require('../../models/Product');

//* @route  POST api/ticket/sale
//* @des    Generate ticket
//* @access Private
router.post('/',[auth,
  [
    check('num_table','Table is required').not().isEmpty(),
    check('num_table','Table must be a number').not().isString(),
    check('num_table','Table lenght must be less than 3').isLength({max:2})
  ],
  [
    check('product','Ticket must have products').not().isEmpty(),
    check('product','Must be an array').isArray(),
  ],
  // check('cashier','Cashier is required').not().isEmpty(),
], async(req,res)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
  }
  const {name} = await User.findById(req.user.id);
  let { product,
        num_table
      } = req.body;
    let subtotal = 0;
    let numbers = product.map(async(item,index)=>{
      let {price} = await Product.findById(item);
      return price;
    })
    const prices = await Promise.all(numbers);
    subtotal = prices.reduce((total,num)=>{
      return total + num;
    },0)
    console.log('numbers: ',subtotal)
  // const {price} = await Product.findById(product);
  // console.log(price);
  res.json({product,name,num_table});
})

//* @route  PUT api/ticket/sale
//* @des    Updating Sale
//* @access Private
router.put('/',[auth,
  check('product','Ticket must have products').not().isEmpty(),
],async(req,res)=>{
  const errors = validationResult(req);
  if(errors){
    return res.status(500).json({error: errors.array()})
  }
})

//* @route  POST api/sale
//* @des    Register a Sale
//* @access Private
router.put('/',[auth],async(req,res)=>{
  const state = await Sale.findOneAndUpdate({hasPaid},true)
  res.json({state});
})


module.exports = router;