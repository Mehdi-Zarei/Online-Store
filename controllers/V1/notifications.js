const { default: mongoose } = require("mongoose");
const notificationsModel = require("../../models/notifications");
const notificationsValidator = require("../../validators/notifications");

exports.create = async (req, res) => {
  const { admin, message } = req.body;

  const validatorResult = notificationsValidator(req.body);

  if (validatorResult != true) {
    return res.status(422).json(validatorResult);
  }

  const newNotification = await notificationsModel.create({ message, admin });

  return res.status(201).json({ message: "Notification send successfully." });
};

exports.get = async (req, res) => {
  const { _id } = req.user;
  const adminNotification = await notificationsModel
    .find({ admin: _id })
    .lean();
  return res.status(200).json(adminNotification);
};

exports.getAll = async (req, res) => {
  const allNotifications = await notificationsModel.find({}).lean();
  return res.json(allNotifications);
};

exports.seen = async (req, res) => {};

exports.remove = async (req, res) => {
  const checkObjectIdResult = mongoose.Types.ObjectId.isValid(req.params);

  if (checkObjectIdResult != true) {
    return res.status(409).json({ message: "ObjectId not valid !" });
  }

  const remove = await notificationsModel.findOneAndDelete({
    _id: req.params.id,
  });

  if (!remove) {
    return res
      .status(404)
      .json({ message: "Notification message not found !" });
  }

  return res.json({
    message: "Notification message removed successfully.",
    remove,
  });
};
