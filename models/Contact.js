const mongoose = require('mongoose');
const ContactSchema = new mongoose.Schema({
  subject: {
    type:String,
    require:true
  },
  suggestion: {
    type:String,
    require:true
  },
})
module.exports = mongoose.model("contact", ContactSchema);