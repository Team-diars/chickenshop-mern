const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Product = require('../../models/Product');
const Sale = require('../../models/Sale');

//* @route  GET api/ticket/
//* @des    Getting all tickets
//* @access Private
router.get('/',[auth],async(req,res)=>{
  try {
    const tickets = await Sale.find({ status: 1 }).exec();
    return res.json(tickets);
  } catch (error) {
    res.status(500).send("Server error");
  }
})

//* @route  POST api/ticket/
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
  let DISCOUNT = 0.18;
  let subtotal = 0;
  let numbers;
  let prices;
  if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});
  let { 
        product,
        num_table
      } = req.body;
  try{
    numbers = product.map(async(item,index)=>{
      let {price} = await Product.findById(item);
      return price;
    })
    prices = await Promise.all(numbers);
    subtotal = prices.reduce((total,num)=>{
      return total + num;
    },0)
    const {name} = await User.findById(req.user.id);
    let total = subtotal - (subtotal*DISCOUNT);
    const newTicket = new Sale({product,num_table,subtotal,total,cashier:name});
    await newTicket.save();
    return res.json({status:'Ticked saved successfully'});
  }catch(e){
    console.log(e.message)
    res.status(500).send(e.message)
  }
})

//* @route  PUT api/ticket/
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

module.exports = router;