const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    departmentID: {
      type: mongoose.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    departmentSubID: {
      type: mongoose.Types.ObjectId,
      ref: "DepartmentSub",
      required: true,
    },
    priority: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    course: {
      type: mongoose.Types.ObjectId,
      ref: "Course",
      required: false,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    answer: {
      type: Number,
      default: 0,
    },
    mainTicketID: {
      type: mongoose.Types.ObjectId,
      ref: "Tickets",
      required: false,
    },
    isAnswer: {
      type: Number, // 0 - 1
      required: true,
    },
  },
  { timestamps: true }
);

const model = mongoose.model("Tickets", schema);

module.exports = model;
