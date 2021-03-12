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
  
})



module.exports = router;