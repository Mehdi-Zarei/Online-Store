const usersModel = require("../../models/user");
const banPhone = require("../../models/ban-phone");

exports.banUsers = async (req, res) => {
  const mainUser = await usersModel.findOne({ _id: req.params.id });
  const banUsers = await banPhone.create({ phone: mainUser.phone });

  if (banUsers) {
    return res.status(200).json({ message: "User Baned Successfully." });
  } else {
    return res.status(500).json({ message: "Server Error!!" });
  }
};
