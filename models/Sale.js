const mongoose = require('mongoose');
const SaleSchema = new mongoose.Schema({
  product:{
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'product',
    require:true
  },
  num_table: {
    type: String,
    require: true
  },
  cashier: {
    type: String,
    require:true
  },
  subtotal:{
    type: Number,
  },
  total:{
    type:Number
  },
  date: {
    type:Date,
    default: Date.now
  },
  hasPaid:{
    type: Boolean,
    default:false
  },
  state:{
    type:Number,
    default: 1
  }
})

module.exports = Sale = mongoose.model('sale',SaleSchema);