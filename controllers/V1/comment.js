const commentsModel = require("../../models/comments");
const courseModel = require("../../models/course");
const usersModel = require("../../models/user");

exports.create = async (req, res) => {
  const { body, score, courseHref } = req.body;

  const course = await courseModel.findOne({ href: courseHref }).lean();

  const comment = await commentsModel.create({
    body,
    score,
    course: course._id,
    creator: req.user._id,
    isAnswer: 0,
    isAccept: 0,
  });

  return res.status(201).json(comment);
};
