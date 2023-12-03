const { default: mongoose } = require("mongoose");
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

exports.remove = async (req, res) => {
  const isValidObjectIDResult = mongoose.Types.ObjectId.isValid(req.params.id);

  if (!isValidObjectIDResult) {
    return res.status(409).json({ message: "Comment ID not valid !!" });
  }

  const remove = await commentsModel.findOneAndDelete({ _id: req.params.id });

  if (!remove) {
    return res.status(404).json({ message: "Comment found !!" });
  }

  return res.status(200).json(remove);
};
