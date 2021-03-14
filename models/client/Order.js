const mongoose = require("mongoose");
const UserClientSchema = new mongoose.Schema({
  cod_user_client:{
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref:'user-client'
  },
  orderItems:[
    {
      name: {
        type:String,
        required:true
      },
      quantity: {
        type:Number,
        required:true
      },
      image:{
        type:String,
        required:true
      },
      price:{
        type:Number,
        required:true
      },
      product:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'product'
      },
    }
  ],
  shippingAddress:{
    address:{
      type:String,
      required:true,
    },
    city:{
      type:String,
      required:true,
    },
    postalCode:{
      type:String,
      required:true,
    },
    country:{
      type:String,
      required:true,
    },
  },
  paymentMethod:{
    type: String,
    required:true,
  },
  paymentResult:{
    id:{
      type:String,
    },
    status:{
      type:String,
    },
    update_time:{
      type:String,
    },
    email_address:{
      type:String,
    },
  },
  taxPrice:{
    type: Number,
    required:true,
    default: 0.0
  },
  ShippingPrice:{
    type: Number,
    required:true,
    default: 0.0
  },
  totalPrice:{
    type: Number,
    required:true,
    default: 0.0
  },
  isPaid:{
    type: Boolean,
    required:true,
    default: false
  },
  paidAt:{
    type: Date,
  },
  isDelivered:{
    type: Boolean,
    required:false,
    default:false
  },
  deliveredAt:{
    type: Date,
  },
},{ timestamps:true });

module.exports = mongoose.model("user-client", UserClientSchema);