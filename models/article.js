const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    creator: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    href: {
      type: String,
      required: true,
    },
    publish: {
      type: Number,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    categoryID: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

const model = mongoose.model("Articles", schema);

module.exports = model;
