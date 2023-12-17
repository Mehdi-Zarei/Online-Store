const { default: mongoose } = require("mongoose");
const notificationsModel = require("../../models/notifications");
const notificationsValidator = require("../../validators/notifications");

exports.create = async (req, res) => {
  try {
    const { admin, message } = req.body;

    const validatorResult = notificationsValidator(req.body);

    if (validatorResult != true) {
      return res.status(422).json(validatorResult);
    }

    const newNotification = await notificationsModel.create({ message, admin });

    return res.status(201).json({ message: "Notification send successfully." });
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.get = async (req, res) => {
  try {
    const { _id } = req.user;
    const adminNotification = await notificationsModel
      .find({ admin: _id })
      .lean();
    return res.status(200).json(adminNotification);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getAll = async (req, res) => {
  try {
    const allNotifications = await notificationsModel.find({}).lean();
    return res.json(allNotifications);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.seen = async (req, res) => {
  try {
    const checkObjectIdResult = mongoose.Types.ObjectId.isValid(req.params);

    if (checkObjectIdResult != true) {
      return res.status(409).json({ message: "ObjectId not valid !" });
    }

    const messageSeen = await notificationsModel
      .findOneAndUpdate({ _id: req.params.id }, { seen: 1 })
      .select("-__v");

    if (!messageSeen) {
      return res
        .status(404)
        .json({ message: "Notification message not found !" });
    }
    return res.json(messageSeen);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.remove = async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(500).json(error);
  }
};
