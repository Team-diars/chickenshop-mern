const {Schema,model} = require('mongoose');
const SaleSchema = new Schema({
  product:{
    type: [Schema.Types.ObjectId],
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
  status:{
    type:Number,
    default: 1
  }
})

module.exports = model('sales',SaleSchema);