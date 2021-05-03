const { Schema, model } = require("mongoose");
const EmployeeSchema = Schema({
  name: {
    type: String,
    require: true,
  },
  lastname: {
    type: String,
    require: true,
  },
  dni: {
    type: String,
    require: true,
    unique: true,
  },
  address: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
  },
  coduser: {
    type: Schema.Types.ObjectId,
    ref: "user",
    require: false,
    default: null,
  },
  role: {
    type: String,
    require: true,
  },
  status: {
    type: Number,
    default: 1,
  },
  date:{
    type:Date,
    default: Date.now,
  }
});

module.exports = model("employee", EmployeeSchema);
