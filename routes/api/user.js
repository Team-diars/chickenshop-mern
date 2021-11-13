const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer');
const bcrypt = require("bcryptjs");
const uuid = require('uuid');
require('dotenv').config()
const { check, validationResult } = require("express-validator/check");
const User = require("../../models/User");
const {encryptpassword} = require('../../lib/encryptPassword');
const {checkPasswordFormat} = require('../../lib/checkPasswordFormat');
const { fieldValidation } = require("../../middleware/fieldValidation");
const auth = require("../../middleware/auth");
require('colors');
const {
  GetAllUser,
  RegisterUser,
  SelectUserbyId,
  UpdateUser,
  DeleteUser,
} = require("../../controller/user");
const Employee = require("../../models/Employee");

//* @route  POST api/user
//* @des    Register User
//* @access Private
router.post(
  "/",
  [
    check("employee", "Employee is required").not().isEmpty(),
    [
      check(
        "password",
        "Please enter a password with 6 or more characters"
      ).isLength({
        min: 6,
      }),
      check(
        "password",
        "Password must contain at least one letter or number"
      ).custom(checkPasswordFormat),
    ],
    fieldValidation,
  ],
  RegisterUser
);

//* @route  POST api/user/reset-password
//* @des    Sending recovery code
//* @access Public
router.post('/reset-password',[
  check('email','Email is required').not().isEmpty(),
  check('email','Must be an email').isEmail()
],async(req,res)=>{
  const {email} = req.body;
  const emailExists = await Employee.exists({email});
  if (emailExists){
    try {
      let protocol = req.protocol;
      let host = req.get('host');
      let path = req.originalUrl;
      let recovery_code = uuid.v5.URL.substring(0,8);
      let mail_message = `${protocol}://${host}${path}/${recovery_code}`;
      const [userData] = await Employee.find({email}).exec();
      await User.findOneAndUpdate({userData},{recovery_code},{new:true});

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
      return res.json({status:"Code has been sent to the email provided"})
    } catch (err) {
      
      res.status(500).send(e.message)
    }
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
    
    res.status(500).send(e.message)
  }
})

//* @route  GET api/user/:id
//* @des    Get User By ID
//* @access Private
router.get("/:id", [auth], async (req, res) => {
  try {
    const {id} = req.params;
    const EmployeeInfo = await Employee.find({coduser:id,status:1});
    const {_id,name,lastname,dni,email,coduser} = EmployeeInfo[0];
    const UserInfo = await User.find({_id:coduser});
    const {password} = UserInfo[0];
    const user = {
      _id,
      name,
      lastname,
      dni,
      email,
      password,
      coduser
    }
    return res.json(user);
  } catch (error) {
    
    res.status(500).send(error);
  }
});


//* @route  GET api/user
//* @des    Get all Users
//* @access Private
router.get("/", auth, GetAllUser);

//* @route  GET api/user/:id
//* @des    Get User by id
//* @access Private
router.get("/:id", auth, SelectUserbyId);


//* @route  PUT api/user/edit
//* @des    Update user by id (Admin)
//* @access Private
router.put("/edit/:id",[auth],
  [
    check("password", "Password is required").not().isEmpty(),
    check(
      "password",
      "Password must have 6 or more characters"
    ).isLength({
      min: 6,
    }),
    check(
      "password",
      "Password must contain at least one letter or number"
    ).custom(checkPasswordFormat),
  ], async(req,res) => {
    try {
      //* Handling errors
      const errors = validationResult(req);
      if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});
      const { id } = req.params;
      const { password:new_password, confirm_password } = req.body;
      console.log(req.body)
      if (new_password != confirm_password){
        return res.status(500).json({ errors: [{ msg: "Las contrasenas no coinciden" }] });
      }
      const user = await User.findById(id);
      if (!user) return res.status(500).send("User doesn't exist");
      const userUpdated = await User.findByIdAndUpdate(id,{password:new_password},{new:true});
      return res.json(userUpdated);
    } catch (error) {
      res.status(500).send(error);
    }
})


//* @route  PUT api/user/edit
//* @des    Update user by id
//* @access Private
router.put(
  "/user/edit/:id",
  [
    auth,
    check("password", "Please enter your current password").not().isEmpty(),
    [
      check(
        "newpassword",
        "Please enter a password with 6 or more characters"
      ).isLength({
        min: 6,
      }),
      check(
        "newpassword",
        "Password must contain at least one letter or number"
      ).custom(checkPasswordFormat),
      fieldValidation,
    ],
  ],
  UpdateUser
);

//* @route  DELETE api/user/delete
//* @des    Delete user by ID
//* @access Private
router.delete("/delete/:id", [auth], DeleteUser);

module.exports = router;
