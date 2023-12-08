const courseModel = require("../../models/course");

exports.get = async (req, res) => {
  const { keyword } = req.params;
  const course = await courseModel
    .find({ name: { $regex: keyword, $options: "i" } })
    .lean();
  return res.json(course);
};
