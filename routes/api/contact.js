const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Contact = require("../../models/Contact");


//* @route  GET api/contact
//* @desc   Get all suggestions
//* @access Private
router.get('/',[
  auth
],async(req,res)=>{
  try {
    const contact = await Contact.find().exec();
    return res.json(contact);
  } catch (error) {
    return res.status(500).send("Server error");
  }
})

//* @route  POST api/contact
//* @desc   Send suggestion
//* @access Private
router.post('/',[
  auth,
  [
    check('email','Email is required').not().isEmpty(),
    check('email','Must be a valid email').isEmail(),
  ],
  check('suggestion','Suggestion is required').not().isEmpty()
],async(req,res)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()})
  }
  try {
    const {email,suggestion} = req.body;
    const contactForm = new Contact({email,suggestion});
    contactForm.save();
    return res.json({msg:"Suggestion has been sent!"});
  } catch (e) {
    console.error(e.message);
    return res.status(500).send("Server error");
  }
})

module.exports = router;