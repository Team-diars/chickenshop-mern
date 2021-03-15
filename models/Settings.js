const mongoose = require('mongoose');
const SettingsSchema = new mongoose.Schema({
  address: {
    type:String,
    require:true
  },
  telephone: {
    type:String,
    require:true
  },
  social_links:{
    facebook:{
      type:String
    },
    instagram:{
      type:String
    }
  }
})
module.exports = mongoose.model("settings", SettingsSchema);