const mongoose = require("mongoose");
const UserClientSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
  },
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
    default: null,
  },
});

module.exports = mongoose.model("user-client", UserClientSchema);
