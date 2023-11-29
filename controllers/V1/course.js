const courseModel = require("../../models/course");
const userCourseModel = require("../../models/userCourse");
const sessionsModel = require("../../models/sessions");
const { isValidObjectId } = require("mongoose");

exports.create = async (req, res) => {
  const {
    name,
    status,
    descriptions,
    categoryID,
    href,
    support,
    price,
    discount,
  } = req.body;

  const courseExist = await courseModel.findOne({
    $or: [{ name: req.body.name }, { href: req.body.href }],
  });

  if (courseExist) {
    return res.status(409).json({ message: "This course already exists!!" });
  }

  const course = await courseModel.create({
    name,
    status,
    descriptions,
    cover: req.file.filename,
    creator: req.user._id,
    categoryID,
    href,
    support,
    price,
    discount,
  });

  const mainCourse = await courseModel
    .findById(course._id)
    .populate("creator", "-password -__v");

  return res.status(201).json(mainCourse);
};

exports.addSessions = async (req, res) => {
  const { title, time, free } = req.body;

  const sessionExist = await sessionsModel.findOne({ title });

  if (sessionExist) {
    return res.status(409).json({ message: "This session already exists!!" });
  }

  const session = await sessionsModel.create({
    title,
    time,
    free,
    video: req.file.filename,
    course: req.params.id,
  });

  return res.status(201).json(session);
};

exports.adminGetRecentSessions = async (req, res) => {
  const sessions = await sessionsModel
    .find({})
    .populate("course", "name")
    .lean();
  return res.json(sessions);
};

exports.getSessionInfo = async (req, res) => {
  const course = await courseModel.findOne({ href: req.params.href }).lean();

  const session = await sessionsModel.findOne({ _id: req.params.sessionID });

  const sessions = await sessionsModel.find({ course: course._id }).lean();

  return res.status(200).json({ session, sessions });
};

exports.removeSession = async (req, res) => {
  const validObjectIdResult = isValidObjectId(req.params.id);

  if (validObjectIdResult != true) {
    return res.status(409).json({ message: "Session ID not valid !!" });
  }

  const remove = await sessionsModel.findOneAndDelete({ _id: req.params.id });

  if (!remove) {
    return res.status(404).json({ message: "Session not found !!" });
  }

  return res.json({ message: "Session deleted successfully !!", remove });
};

exports.register = async (req, res) => {
  const isUserAlreadyRegisteredInCourse = await userCourseModel.findOne({
    course: req.params.id,
    user: req.user._id,
  });

  if (isUserAlreadyRegisteredInCourse) {
    return res
      .status(409)
      .json({ message: "You have already registered for this course !!" });
  }

  const register = await userCourseModel.create({
    course: req.params.id,
    user: req.user._id,
    price: req.body.price,
  });

  return res.status(201).json({
    message:
      "Your registration for this course has been successfully completed.",
  });
};
