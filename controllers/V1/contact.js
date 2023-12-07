const { isValidObjectId, default: mongoose } = require("mongoose");
const contactModel = require("../../models/contact");
const nodemailer = require("nodemailer");

exports.getAll = async (req, res) => {
  const contacts = await contactModel.find({}).lean();
  return res.status(200).json(contacts);
};

exports.create = async (req, res) => {
  const { name, body, email, phone } = req.body;

  const newContact = await contactModel.create({
    name,
    email,
    phone,
    body,
    answer: 0,
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
      .status(404)
      .json({ message: "The contact message not found !!" });
  }

  return res
    .status(200)
    .json({ message: "Contact message removed successfully." });
};

exports.answer = async (req, res) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "test@gmail.com", // This entry must be changed to send an email.
      pass: "testPassword", // This entry must be changed to send an email.
    },
  });

  const mailOptions = {
    from: "test@gmail.com", // This entry must be changed to send an email.
    to: req.body.email,
    subject: "پاسخ پیام شما",
    text: req.body.answer,
  };

  transporter.sendMail(mailOptions, async (err, info) => {
    if (err) {
      return res.status(502).json({ message: err });
    } else {
      const updateContactInfo = await contactModel.findOneAndUpdate(
        { email: req.body.email },
        {
          answer: 1,
        }
      );
      return res.json({ message: "Email send successfully." });
    }
  });
};
