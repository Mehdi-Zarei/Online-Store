const { default: mongoose } = require("mongoose");
const commentsModel = require("../../models/comments");
const courseModel = require("../../models/course");

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

exports.accept = async (req, res) => {
  const isValidObjectIDResult = mongoose.Types.ObjectId.isValid(req.params.id);

  if (!isValidObjectIDResult) {
    return res.status(422).json({ message: "Comment ID not valid !!" });
  }

  const accepted = await commentsModel.findOneAndUpdate(
    { _id: req.params.id },
    {
      isAccept: 1,
    }
  );

  if (!accepted) {
    return res.status(404).json({ message: "Comment not found !!" });
  }

  return res.status(200).json({ message: "Comment accepted successfully!!" });
};

exports.reject = async (req, res) => {
  const isValidObjectIDResult = mongoose.Types.ObjectId.isValid(req.params.id);

  if (!isValidObjectIDResult) {
    return res.status(422).json({ message: "Comment ID not valid !!" });
  }

  const rejected = await commentsModel.findOneAndUpdate(
    { _id: req.params.id },
    {
      isAccept: 0,
    }
  );
  if (!rejected) {
    return res.status(404).json({ message: "Comment not found !!" });
  }

  return res.status(200).json({ message: "Comment rejected successfully!!" });
};

exports.answer = async (req, res) => {
  const isValidObjectIDResult = mongoose.Types.ObjectId.isValid(req.params.id);

  if (!isValidObjectIDResult) {
    return res.status(422).json({ message: "Comment ID not valid !!" });
  }

  const { body } = req.body;

  const acceptedComment = await commentsModel.findOneAndUpdate(
    { _id: req.params.id },
    { isAccept: 1 }
  );

  if (!acceptedComment) {
    return res.status(404).json({ message: "Comment not found!!" });
  }

  const answerComment = await commentsModel.create({
    body,
    course: acceptedComment.course,
    creator: req.user._id,
    isAnswer: 1,
    isAccept: 1,
    mainCommentID: req.params.id,
  });

  return res.status(201).json(answerComment);
};

exports.getAll = async (req, res) => {
  const comments = await commentsModel
    .find({})
    .populate("creator", "-password")
    .populate("course")
    .lean();

  let allComments = [];

  comments.forEach((comment) => {
    comments.forEach((answerComment) => {
      if (String(answerComment.mainCommentID) == String(comment._id)) {
        allComments.push({
          ...comment,
          course: comment.course.name,
          creator: comment.creator.name,
          answerComment,
        });
      }
    });
  });

  return res.json({ comments: allComments });
};
