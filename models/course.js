const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    descriptions: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    creator: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    categoryID: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    href: {
      type: String,
      required: true,
    },
    support: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

schema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "course",
});

schema.virtual("sessions", {
  ref: "Sessions",
  localField: "_id",
  foreignField: "course",
});

const coursesModel = mongoose.model("Course", schema);

module.exports = coursesModel;
