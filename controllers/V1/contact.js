const contactModel = require("../../models/contact");

exports.getAll = async (req, res) => {
  const contacts = await contactModel.find({}).lean();
  return res.status(200).json(contacts);
};

exports.create = async (req, res) => {
  const { name, body, email, phone } = req.body;

  const contact = await contactModel.create({
    name,
    email,
    phone,
    body,
    isAnswer: 0,
  });
  return res.status(201).json({ message: "Your message sent successfully." });
};

exports.remove = async (req, res) => {};

exports.answer = async (req, res) => {};
