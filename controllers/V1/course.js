const courseModel = require("../../models/course");
const sessionsModel = require("../../models/sessions");

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
