const newsLettersModel = require("../../models/newsLetters");

exports.getAll = async (req, res) => {
  try {
    const news = await newsLettersModel.find({}).lean();
    return res.json(news);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.create = async (req, res) => {
  try {
    const { email } = req.body;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: "Invalid email address",
      });
    }

    const isEmailExist = await newsLettersModel.findOne({ email });

    if (isEmailExist) {
      return res.json({
        message: "This email is already registered in newsletters",
      });
    }

    const news = await newsLettersModel.create({ email });

    return res.json({
      message: "You have successfully subscribed to the site's newsletter",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
