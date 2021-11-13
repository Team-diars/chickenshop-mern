const mongoose = require("mongoose");
const SettingsSchema = new mongoose.Schema({
  appname: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  telephone: {
    type: String,
    require: true,
  },
  social_links: {
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
});
module.exports = mongoose.model("settings", SettingsSchema);
