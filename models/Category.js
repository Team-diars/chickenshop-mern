const { Schema, model } = require("mongoose");
const CategorySchema = Schema({
  name: {
    type: String,
    unique: true,
    require: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

module.exports = model("category", CategorySchema);