const { isValidObjectId } = require("mongoose");
const categoryModel = require("../../models/category");
const validator = require("../../validators/category");

exports.create = async (req, res) => {
  const validateResult = validator(req.body);

  if (validateResult != true) {
    return res.status(409).json(validateResult);
  }

  const categoryExist = await categoryModel
    .findOne({ title: req.body.title, href: req.body.href })
    .lean();

  if (categoryExist) {
    return res.status(409).json({ message: "This category already exist !!" });
  }
  const { title, href } = req.body;

  const category = await categoryModel.create({
    title,
    href,
  });
  return res.status(201).json(category);
};

exports.getAll = async (req, res) => {
  const category = await categoryModel.find({}, "-__v").lean();
  return res.status(200).json(category);
};

exports.remove = async (req, res) => {
  const isValidObjectIdResult = isValidObjectId(req.params.id);

  if (isValidObjectIdResult != true) {
    return res.status(409).json({ message: "Category ID not valid !!" });
  }

  const categoryExist = await categoryModel.findOne({ _id: req.params.id });

  if (!categoryExist) {
    return res
      .status(404)
      .json({ message: "Category not found whit this ID !! " });
  }

  const remove = await categoryModel.findOneAndDelete({ _id: req.params.id });
  return res
    .status(200)
    .json({ message: "Category removed successfully.", remove });
};

exports.update = async (req, res) => {
  const isValidObjectIdResult = isValidObjectId(req.params.id);

  if (isValidObjectIdResult != true) {
    return res.status(409).json({ message: "Category ID not valid !!" });
  }

  const categoryExist = await categoryModel.findOne({ _id: req.params.id });

  if (!categoryExist) {
    return res
      .status(404)
      .json({ message: "Category not found whit this ID !! " });
  }

  const { title, href } = req.body;

  const update = await categoryModel.findOneAndUpdate(
    { _id: req.params.id },
    {
      title,
      href,
    }
  );
  return res.status(200).json({ message: "Category info updated.", update });
};