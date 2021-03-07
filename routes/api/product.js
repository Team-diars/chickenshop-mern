const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const auth = require('../../middleware/auth');

router.post('/',[auth],async(req,res)=>{
  
})

module.exports = router;