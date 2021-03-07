const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
  name:{
    type:String,
    require:true
  },
  price:{
    type:Number,
    require:true
  },
  state:{
    type:Number,
    default: 1,
  },
})

module.exports = Product = mongoose.model('product',ProductSchema);