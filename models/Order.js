const { Schema, model } = require("mongoose");
const OrderSchema = new Schema({
  total: {
    type: Number,
  },
  specialDelivery: {
    type: Boolean,
    default: true,
  },
  products: [
    {
      name: String,
      description: String,
      image: String,
      price: Number,
      category: String,
      quantity: Number,
      creams: [String],
    },
  ],
  status: {
    type: Number,
    default: 1,
  },
  customer: {
    type: String,
  },
  email: {
    type: String,
  },
  note: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("order", OrderSchema);


