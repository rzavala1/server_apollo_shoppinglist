const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    requiered: true,
  },
  password: {
    type: String,
    requiered: true,
  },
  address: String,
  city: String,
  country: String,
  phone: String,
  email: String,
  photo: String,
  token: String,
});

module.exports = model("User", userSchema);
