const { isValidObjectId } = require("mongoose");
const categoryModel = require("../../models/category");
const courseModel = require("../../models/course");
const validator = require("../../validators/category");

exports.create = async (req, res) => {
  try {
    const validateResult = validator(req.body);

    if (validateResult != true) {
      return res.status(409).json(validateResult);
    }

    const categoryExist = await categoryModel
      .findOne({ title: req.body.title, href: req.body.href })
      .lean();

    if (categoryExist) {
      return res
        .status(409)
        .json({ message: "This category already exist !!" });
    }
    const { title, href } = req.body;

    const category = await categoryModel.create({
      title,
      href,
    });
    return res.status(201).json(category);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getAll = async (req, res) => {
  try {
    const category = await categoryModel.find({}, "-__v").lean();
    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.remove = async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.update = async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getCourseByCategory = async (req, res) => {
  try {
    const { href } = req.params;
    const category = await categoryModel.findOne({ href });

    if (category) {
      const course = await courseModel.find(
        { categoryID: category._id },
        "-__v"
      );
      res.json(course);
    } else {
      res.json([]);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
