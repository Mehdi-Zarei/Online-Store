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

exports.remove = async (req, res) => {};

exports.saveDraft = async (req, res) => {};
