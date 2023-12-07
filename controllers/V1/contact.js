const { isValidObjectId, default: mongoose } = require("mongoose");
const contactModel = require("../../models/contact");

exports.getAll = async (req, res) => {
  const contacts = await contactModel.find({}).lean();
  return res.status(200).json(contacts);
};

exports.create = async (req, res) => {
  const { name, body, email, phone } = req.body;

  await contactModel.create({
    name,
    email,
    phone,
    body,
    isAnswer: 0,
  });
  return res.status(201).json({ message: "Your message sent successfully." });
};

exports.remove = async (req, res) => {
  const isValidObjectId = mongoose.Types.ObjectId.isValid(req.params);

  if (!isValidObjectId) {
    return res.status(422).json({ message: "The contact ID not valid !!" });
  }
  const remove = await contactModel.findOneAndDelete({ _id: req.params.id });

  if (!remove) {
    return res
      .status(422)
      .json({ message: "The contact message not found !!" });
  }

  return res
    .status(422)
    .json({ message: "Contact message removed successfully." });
};

exports.answer = async (req, res) => {};
