const usersModel = require("../../models/user");
const banModel = require("../../models/banUsers");

exports.banUsers = async (req, res) => {
  const mainUser = await usersModel.findOne({ _id: req.params.id });

  const alreadyBaned = await banModel.findOne({ id: req.params.id });

  if (alreadyBaned) {
    return res.status(403).json({ message: "User already Baned !!" });
  }

  const banUsers = await banModel.create({
    phone: mainUser.phone,
    userName: mainUser.userName,
    email: mainUser.email,
    id: mainUser._id,
  });

  if (banUsers) {
    return res.status(200).json({ message: "User Baned Successfully." });
  } else {
    return res.status(500).json({ message: "Server Error!!" });
  }
};
