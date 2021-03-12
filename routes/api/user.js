const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const nodemailer = require('nodemailer');
const uuid = require('uuid');
require('dotenv').config()
const { check, validationResult } = require("express-validator/check");
const User = require("../../models/User");
const {encryptpassword} = require('../../lib/encryptPassword');
const {checkPasswordFormat} = require('../../lib/validatePassword');

//* @route  POST api/user
//* @des    Register User
//* @access Private
router.post( "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password","Please enter a password with 6 or more characters").isLength({min: 6}),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      //* Validate if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }
      //* Get users gravatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pd",
        d: "mm",
      });
      user = new User({
        name,
        email,
        avatar,
        password: encryptpassword(password),
      });
      await user.save(); //* Saving new user
      
      //* Return JWT (jsonwebtoken)
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).send("Server error");
    }
  }
);

//* @route  POST api/user/reset-password
//* @des    Reset password
//* @access Public
router.post('/reset-password',[
  check('email','Email is required').not().isEmpty(),
  check('email','Must be an email').isEmail()
],async(req,res)=>{
  const {email} = req.body;
  const emailExists = User.find({email}).exec();
  if (emailExists){
    let protocol = req.protocol;
    let host = req.get('host');
    let path = req.originalUrl;
    let recovery_code = uuid.v5.URL.substring(0,8);
    let mail_message = `${protocol}://${host}${path}/${recovery_code}`;
    await User.findOneAndUpdate({email},{recovery_code},{new:true});

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      secure: false,
      auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
      }
    });
    //* Email data
    var mailOptions = {
      from: 'shop.testing.150@gmail.com',
      to: email,
      subject: 'Recovery Code',
      html: `<a href="${mail_message}">Update your password here!</a>`
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        res.redirect('/login');
      } else {
        res.redirect('/login');
      }
    });
    // console.log({protocol:req.protocol,host:req.get('host'),url:req.originalUrl})
    return res.json({status:"Code has been sent to the email provided"})
  }else{
    return res.json({status:"Code has been sent to the email provided"})
  }
})

//* @route  GET api/user/reset-password/:code
//* @des    Validate if recovery_code exists
//* @access Private
router.get('/reset-password/:code',async(req,res)=>{
  const { code } = req.params;
  const codeExists = await User.exists({recovery_code:code});
  if(codeExists){
    res.json({status:"Code exists"})
  }else{
    res.json({status:"Code does not exist"})
  }
})

//* @route  POST api/user/reset-password/:code
//* @des    Change password
//* @access Private
router.post('/reset-password/:code',[
  check("password","Please enter a password with 6 or more characters").isLength({min: 6}),
  check("password","Password is required").not().isEmpty(),
  check("password","Password must have lowerCase, upperCase and numbers").custom(checkPasswordFormat)
],async(req,res)=>{
  //* Handling errors
  const errors = validationResult(req);
  if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});
  //* Process to update password
  try {
    const { code } = req.params;
    const { password } = req.body;
    const password_updated = await encryptpassword(password);
    await User.findOneAndUpdate({recovery_code:code},{recovery_code:null,password:password_updated},{new:true}); //* new:true is for not getting as a response the previous record
    return res.json({status:"Password updated successfully"})
  } catch (e) {
    console.log(e.message)
    res.status(500).send(e.message)
  }
})

module.exports = router;
