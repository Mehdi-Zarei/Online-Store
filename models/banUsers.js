const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    _id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const banUsers = mongoose.model("BanUsers", schema);

module.exports = banUsers;
