const { default: mongoose } = require("mongoose");
const articlesModel = require("../../models/article");

exports.getAll = async (req, res) => {
  try {
    const articles = await articlesModel
      .find({ publish: 1 }, "-__v -publish")
      .populate("creator", "name")
      .populate("categoryID", "title");

    return res.json(articles);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.create = async (req, res) => {
  try {
    const { body, description, title, href, categoryID } = req.body;

    const articleExist = await articlesModel.findOne({
      $or: [{ title: req.body.title }, { href: req.body.href }],
    });

    if (articleExist) {
      return res.status(409).json({ message: "Article already exists!!" });
    }

    const article = await articlesModel.create({
      body,
      description,
      title,
      href,
      cover: req.file.filename,
      categoryID,
      publish: 0,
      creator: req.user._id,
    });

    const mainArticle = await articlesModel
      .findById(article._id)
      .populate("creator", "name")
      .populate("categoryID", "title");

    return res.status(201).json(mainArticle);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getOne = async (req, res) => {
  try {
    const { href } = req.params;

    const article = await articlesModel
      .findOne({ href, publish: 1 }, "-__v -publish")
      .populate("creator", "name")
      .populate("categoryID", "title");

    if (!article) {
      return res.status(404).json({ message: "Article not found !" });
    }
    return res.json(article);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(409).json({ message: "Article ID not valid !" });
    }

    const remove = await articlesModel.findOneAndDelete({ _id: id });

    if (!remove) {
      return res
        .status(404)
        .json({ message: "Article not found with this ID !" });
    }

    return res.json({ message: "Article deleted successfully." });
  } catch (error) {
    return res.status(500).json(error);
  }
};
