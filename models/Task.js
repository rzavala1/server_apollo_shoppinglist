const { Schema, model } = require("mongoose");

const taskSchema = new Schema({
  title: {
    type: String,
    requiered: true,
  },
  terminate: {
    type: Boolean,
    requiered: true,
  },
});

module.exports = model("Task", taskSchema);
