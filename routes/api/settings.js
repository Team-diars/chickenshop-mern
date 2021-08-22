const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Config = require("../../models/Settings");


//* @route  GET api/settings
//* @desc   Get Settings Info
//* @access Private
router.get('/',async(req,res)=>{
  try {
    const config = await Config.find().exec();
    return res.json(config[0]);
    // return;
  } catch (error) {
    return res.status(500).send("Server error");
  }
})

//* @route  POST api/settings
//* @desc   Save Settings
//* @access Private
router.post('/',[
  auth,
  check('address','Address is required').not().isEmpty()
],async(req,res)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()})
  }
  const newConfig = {};
  let config;
  const {
    address,
    telephone,
    facebook,
    email,
    instagram
  } = req.body;
  if (email) newConfig.email = email;
  if (address) newConfig.address = address;
  if (telephone) newConfig.telephone = telephone;
  
  newConfig.social_links = {}
  if (facebook) newConfig.social_links.facebook = facebook;
  if (instagram) newConfig.social_links.instagram = instagram;
  try{
    let [record] = await Config.find().exec();
    if (record) {
      const {_id} = record;
      config = await Config.findByIdAndUpdate(_id,newConfig,{new:true});
      return res.json(config);
    }
    config = new Config(newConfig);
    await config.save()
    return res.json(config);
  }catch(e){
    console.error(e.message);
    res.status(500).send('Server Error');
  }
})


module.exports = router;