const {Schema,model} = require('mongoose');
const ProductSchema = new Schema({
  category:{
    type: Schema.Types.ObjectId,
    ref:'category',
    required:true
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
})

module.exports = model('product',ProductSchema);