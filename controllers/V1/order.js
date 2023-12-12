const { mongo, default: mongoose } = require("mongoose");
const userCourse = require("../../models/userCourse");

exports.getAll = async (req, res) => {
  const orders = await userCourse
    .find({ user: req.user._id })
    .populate("course", "name href")
    .populate("user", "name")
    .lean();

  if (!orders) {
    return res
      .status(404)
      .json({ message: "You have not registered for any course yet." });
  }

  return res.json(orders);
};

exports.getOne = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(422).json({ message: "Course ID not valid !" });
  }

  const order = await userCourse
    .findOne({ _id: id })
    .populate("course", "name href")
    .populate("user", "name")
    .lean();

  if (!order) {
    return res
      .status(404)
      .json({ message: "You are not registered for this course !" });
  }

  return res.json(order);
};
