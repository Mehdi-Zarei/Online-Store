const usersModel = require("../../models/user");
const banModel = require("../../models/banUsers");
const bcrypt = require("bcrypt");
const { default: mongoose, isValidObjectId } = require("mongoose");

exports.banUsers = async (req, res) => {
  const mainUser = await usersModel.findOne({ _id: req.params.id });

  const alreadyBaned = await banModel.findOne({ userID: req.params.id });

  if (alreadyBaned) {
    return res.status(409).json({ message: "User already baned !!" });
  }

  const banUser = await banModel.create({
    name: mainUser.name,
    userName: mainUser.userName,
    email: mainUser.email,
    phone: mainUser.phone,
    userID: mainUser._id,
  });

  if (banUser) {
    return res.status(201).json({ message: "User baned successfully." });
  } else {
    return res.status(500).json({ message: "Server error !!" });
  }
};

exports.getAll = async (req, res) => {
  const users = await usersModel.find({}, "-password -__v").lean();

  return res.json(users);
};

exports.removeUser = async (req, res) => {
  const isValidUserId = isValidObjectId(req.params.id);

  if (!isValidUserId) {
    return res.status(409).json({ message: "user ID not valid !!" });
  }

  const remove = await usersModel.findOneAndDelete({ _id: req.params.id });

  if (!remove) {
    return res.status(404).json({ message: "User not found whit this ID !!" });
  }

  return res.status(200).json({ message: "User removed successfully." });
};

exports.changeUserRole = async (req, res) => {
  const { id } = req.body;
  const isValidUserId = isValidObjectId(id);

  if (!isValidUserId) {
    return res.status(409).json({ message: "User ID not valid!!" });
  }

  const user = await usersModel.findOne({ _id: id }).lean();

  if (!user) {
    return res.status(404).json({ message: "User not found whit this ID !!" });
  }

  let newRole = user.role === "ADMIN" ? "USER" : "ADMIN";

  const updateRole = await usersModel.findOneAndUpdate(
    { _id: id },
    { role: newRole }
  );

  if (!updateRole) {
    return res.status(500).json({ message: "Server error !!" });
  }

  return res.status(200).json({ message: "User role changed successfully !!" });
};

exports.updateUser = async (req, res) => {
  const { name, userName, phone, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 12);

  const update = await usersModel
    .findByIdAndUpdate(
      { _id: req.user._id },
      {
        name,
        userName,
        email,
        phone,
        password: hashedPassword,
      }
    )
    .select("-password -__v")
    .lean();
  return res.status(200).json({
    message: "Your user information has been successfully updated.",
    update,
  });
};
