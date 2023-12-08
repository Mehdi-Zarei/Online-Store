const mongoose = require("mongoose");

const schema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
});

const model = mongoose.model("newsLetters", schema);

module.exports = model;
