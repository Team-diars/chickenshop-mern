const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  password: {
    type: String,
    require: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  recovery_code: {
    type: String,
    default: null
  },
  status:{
    type:Number,
    default: 1,
  },
});

module.exports = mongoose.model("user", UserSchema);
