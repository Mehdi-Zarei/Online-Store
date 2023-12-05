const contactModel = require("../../models/contact");

exports.getAll = async (req, res) => {};

exports.create = async (req, res) => {
  const { name, body, email, phone } = req.body;

  const contact = await contactModel.create({
    name,
    email,
    phone,
    body,
    isAnswer: 0,
  });
  return res.status(201).json(contact);
};

exports.remove = async (req, res) => {};

exports.answer = async (req, res) => {};
