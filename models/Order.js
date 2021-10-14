const {
  Schema,
  model
} = require('mongoose');
const OrderSchema = new Schema({
  total:{
    type:Number,
  },
  specialDelivery:{
    type:Boolean,
    default: true,
  },
  products: [{
    name: String,
    desc: String,
    image: String,
    price: Number,
    category: String,
    quantity: Number,
    creams: [String]
  }],
  status: {
    type: Number,
    default: 1,
  },
  date: {
    type: Date,
    default: Date.now,
  }
})

module.exports = model('order', OrderSchema);