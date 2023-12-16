const menuModel = require("../../models/menu");

exports.getAll = async (req, res) => {};

exports.create = async (req, res) => {
  const { title, href, parent } = req.body;

  const menu = await menuModel.create({
    title,
    href,
    parent,
  });

  return res.status(201).json(menu);
};

exports.adminGetAll = async (req, res) => {};

exports.remove = async (req, res) => {};

exports.updateMenuName = async (req, res) => {};
