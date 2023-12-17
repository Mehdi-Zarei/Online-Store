const { isValidObjectId, default: mongoose } = require("mongoose");
const contactModel = require("../../models/contact");
const nodemailer = require("nodemailer");

exports.getAll = async (req, res) => {
  try {
    const contacts = await contactModel.find({}).lean();
    return res.status(200).json(contacts);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.create = async (req, res) => {
  try {
    const { name, body, email, phone } = req.body;

    const newContact = await contactModel.create({
      name,
      email,
      phone,
      body,
      answer: 0,
    });
    return res.status(201).json({ message: "Your message sent successfully." });
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.remove = async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.answer = async (req, res) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USERNAME,
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
  } catch (error) {
    return res.status(500).json(error);
  }
};
