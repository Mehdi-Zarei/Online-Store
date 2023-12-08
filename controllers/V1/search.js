const courseModel = require("../../models/course");

exports.get = async (req, res) => {
  const { keyword } = req.params;
  const course = await courseModel
    .find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { href: { $regex: keyword, $options: "i" } },
      ],
    })
    .lean();
  return res.json(course);
};
