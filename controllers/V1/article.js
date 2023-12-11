const { default: mongoose } = require("mongoose");
const articlesModel = require("../../models/article");

exports.getAll = async (req, res) => {};

exports.create = async (req, res) => {
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
};

exports.getOne = async (req, res) => {};

exports.remove = async (req, res) => {
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
};

exports.saveDraft = async (req, res) => {};
