const ticketsModel = require("../../models/ticket");
const departmentsModel = require("../../models/department");
const departmentsSubModel = require("../../models/departmentSub");

exports.getAll = async (req, res) => {};

exports.create = async (req, res) => {};

exports.userTickets = async (req, res) => {};

exports.departments = async (req, res) => {
  const department = await departmentsModel.find({}, "title").lean();

  return res.json(department);
};

exports.departmentsSub = async (req, res) => {};

exports.setAnswer = async (req, res) => {};

exports.getAnswer = async (req, res) => {};

exports.remove = async (req, res) => {};

exports.createDepartments = async (req, res) => {
  const { title } = req.body;

  const department = await departmentsModel.create({ title });

  return res.status(201).json(department);
};

exports.createDepartmentSub = async (req, res) => {
  const { title, parent } = req.body;

  const departmentSub = await departmentsSubModel.create({ title, parent });

  return res.status(201).json(departmentSub);
};
