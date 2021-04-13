const {Schema,model} = require('mongoose');
const ProductSchema = new Schema({
  category:{
    type: String,
    required:true
  },
  description:{
    type:String,
    require:true
  },
  stock:{
    type:Number,
    require:true,
  },
  name:{
    type:String,
    require:true,
    unique:true
  },
  price:{
    type:Number,
    require:true
  },
  status:{
    type:Number,
    default: 1,
  },
  date:{
    type:Date,
    default: Date.now,
  }
})

module.exports = model('product',ProductSchema);