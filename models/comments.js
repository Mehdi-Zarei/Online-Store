const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      default: 5,
    },
    isAnswer: {
      type: Number,
      default: 0,
    },
    isAccept: {
      type: Number,
      default: 0,
    },
    creator: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    course: {
      type: mongoose.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    mainCommentID: {
      type: mongoose.Types.ObjectId,
      ref: "Comment",
    },
  },
  { timestamps: true }
);

const commentsModel = mongoose.model("Comment", schema);

module.exports = commentsModel;
