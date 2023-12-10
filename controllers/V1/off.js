const { json } = require("express");
const courseModel = require("../../models/course");
const offModel = require("../../models/off");

exports.setOnAll = async (req, res) => {
  const { discount } = req.body;

  const setDiscount = await courseModel.updateMany({ discount });

  return res.json({ message: "Discount set successfully on all courses." });
};

exports.getAll = async (req, res) => {
  const allDiscountCodes = await offModel
    .find({}, "-__v")
    .populate("creator", "name")
    .populate("course", "name")
    .lean();
  return res.json(allDiscountCodes);
};

exports.create = async (req, res) => {
  const { code, max, course, percent } = req.body;

  const existCode = await offModel.findOne({ code });

  if (existCode) {
    return res
      .status(409)
      .json({ message: "This discount code already exist !" });
  }

  const newOff = await offModel.create({
    code,
    course,
    max,
    percent,
    uses: 0,
    creator: req.user._id,
  });

  return res
    .status(201)
    .json({ message: "New discount code created successfully." });
};

exports.getOn = async (req, res) => {
  const { code } = req.params;
  const discountCode = await offModel
    .findOne({ code })
    .populate("creator", "name")
    .populate("course", "name");
  if (!discountCode) {
    return res.status(404).json({ message: "Discount code not found!" });
  }
  return res.json(discountCode);
};

exports.remove = async (req, res) => {
  const { code } = req.params;
  const remove = await offModel.findOneAndDelete({ code });
  if (!remove) {
    return res.status(404).json({ message: "Discount code not found !" });
  }
  return res.json(remove);
};
