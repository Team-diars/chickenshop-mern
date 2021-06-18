const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Employee = require('../../models/Employee');
const Product = require('../../models/Product');
const Sale = require('../../models/Sale');

//* @route  GET api/ticket/
//* @des    Getting all tickets
//* @access Private
router.get('/',[auth],async(req,res)=>{
  try {
    const tickets = await Sale.find({hasPaid:false,status:1}).sort({date: -1}).exec();
    return res.json(tickets);
  } catch (error) {
    res.status(500).send("Server error");
  }
})

//* @route  GET api/ticket/
//* @des    Getting ticket by ID
//* @access Private
router.get('/:id',[auth],async(req,res)=>{
  try {
    const {id} = req.params;
    const ticket = await Sale.find({_id:id,status:1}).exec();
    return res.json(ticket[0]);
  } catch (error) {
    res.status(500).send("Server error");
  }
})


//* @route  POST api/ticket/
//* @desc    Register ticket
//* @access Private
router.post('/',[auth,
  [
    check('num_table','Table is required').not().isEmpty(),
    check('num_table','Table must be a number').not().isString(),
    check('num_table','Table lenght must be less than 3').isLength({max:2}),
    check('num_table','Table number must be greater than 0 or less than 20').isInt({min:1,max:20})
  ],
  [
    // check('product','Ticket must have products').not().isEmpty(),
    // check('product','Must be an array').isArray(),
  ],
], async(req,res)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});
  let DISCOUNT = 0.18;
  let subtotal = 0;
  let amount_per_item;
  let prices;
  let { 
    num_table,
    product
  } = req.body;
  let tableExists = await Sale.exists({num_table,status:1});
  if (tableExists) return res.status(500).json({errors: [{"msg":`Table ${num_table} is being attended, choose another table`}]});
  try{
    amount_per_item = product.map(async(item,idx)=>{
      let {price} = await Product.findOne({name:item?.dish_name || 
                                              item?.drink_name || 
                                              item?.salad_name,
                                        status:1});
      let amount = price * item?.dish_quantity || item?.drink_quantity || item?.salad_quantity;
      return amount;
    });
    prices = await Promise.all(amount_per_item);
    subtotal = prices.reduce((total,num)=>{
      return total + num;
    },0);
    const {name,lastname} = await Employee.findOne({"_id":req.user.id});
    let total = subtotal - (subtotal*DISCOUNT);
    const ids = product.map(item => item?.dish_id || 
                                    item?.drink_id || 
                                    item?.salad_id);
    
    const newTicket = new Sale({product:ids,num_table,subtotal,total,cashier:`${name} ${lastname}`});
    await newTicket.save();
    return res.json({status:'Ticked saved successfully'});
  }catch(e){
    console.log(e.message)
    res.status(500).send(e.message)
  }
})

//* @route  PUT api/ticket/edit/:id
//* @des    Updating Ticket
//* @access Private
router.put('/edit/:id',[auth,
  check('product','Ticket must have products').not().isEmpty(),
  check('product','Must be an array').isArray(),
],async(req,res)=>{
  //* Validating if there's any errors
  const errors = validationResult(req);
  if(!errors.isEmpty()) return res.status(500).json({error: errors.array()})
  
  try {
    const { id } = req.params;
    const { product } = req.body;
    const exists = await Sale.exists({ _id: id, status: 1 });
    if (!exists) {
      return res.status(500).send("Ticket does not exist");
    }
    await Sale.findByIdAndUpdate(id, product, {new:true}); //* new:true is for not getting as a response the previous record
    return res.json({status: "Ticket Updated"});

  } catch (error) {
    return res.status(500).send("Server error");
  }
})

//* @route  DELETE api/ticket/
//* @des    Deleting a ticket
//* @access Private
router.delete('/delete/:id',[auth],async(req,res)=>{
  try {
    const { id } = req.params;
    const exists = await Sale.exists({ _id: id, status: 1 })
    console.log('id'.red,exists);
    if (!exists) {
      return res.status(500).send("Ticket not found");
    }
    await Sale.findByIdAndUpdate(id, { status: 0 });
    return res.json({
      status: "Ticket removed successfully",
    });
  } catch (error) {
    return res.status(500).send("Server error");
  }
})

module.exports = router;