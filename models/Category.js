const { Schema, model } = require("mongoose");
const CategorySchema = Schema({
  name: {
    type: String,
    unique: true,
    require: true,
  },
  status: {
    type:Number,
    default: 1,
  },
});

module.exports = model("category", CategorySchema);