const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const banUsers = mongoose.model("BanUsers", schema);

module.exports = banUsers;
