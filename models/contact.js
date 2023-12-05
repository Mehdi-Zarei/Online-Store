const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  isAnswer: {
    type: Number, // 0 - 1
    required: true,
  },
});

const model = mongoose.model("Contact", schema);

module.exports = model;
