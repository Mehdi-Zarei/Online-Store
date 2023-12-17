const { json } = require("express");
const courseModel = require("../../models/course");
const offModel = require("../../models/off");
const { default: mongoose } = require("mongoose");

exports.setOnAll = async (req, res) => {
  try {
    const { discount } = req.body;

    const setDiscount = await courseModel.updateMany({ discount });

    return res.json({ message: "Discount set successfully on all courses." });
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getAll = async (req, res) => {
  try {
    const allDiscountCodes = await offModel
      .find({}, "-__v")
      .populate("creator", "name")
      .populate("course", "name")
      .lean();
    return res.json(allDiscountCodes);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.create = async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.useCode = async (req, res) => {
  try {
    const { code } = req.params;
    const { course } = req.body;

    if (mongoose.Types.ObjectId.isValid(course) != true) {
      return res.status(422).json({ message: "Invalid course ID !" });
    }

    const offCode = await offModel.findOne({ code, course });

    if (!offCode) {
      return res.status(404).json({ message: "Discount code not found !" });
    } else if (offCode.uses === offCode.max) {
      return res
        .status(409)
        .json({ message: "This discount code has already been used !" });
    } else {
      await offModel.findOneAndUpdate(
        { code, course },
        { uses: offCode.uses + 1 }
      );
      return res.json(offCode);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.remove = async (req, res) => {
  try {
    const { code } = req.params;
    const remove = await offModel
      .findOneAndDelete({ code })
      .populate("creator", "name")
      .populate("course", "name");
    if (!remove) {
      return res.status(404).json({ message: "Discount code not found !" });
    }
    return res.json(remove);
  } catch (error) {
    return res.status(500).json(error);
  }
};
