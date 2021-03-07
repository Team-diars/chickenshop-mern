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
    require: true,
  },
  coduser: {
    type: Schema.Types.ObjectId,
    ref: "user",
    require: false,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

module.exports = model("employee", EmployeeSchema);
