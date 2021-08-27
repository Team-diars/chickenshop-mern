const {
  Schema,
  model
} = require('mongoose');
const OrderSchema = new Schema({
  products: [{
    name: String,
    price: Number,
    category: String,
    qty: Number,
    creams: Array
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