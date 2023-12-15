const ticketsModel = require("../../models/ticket");
const departmentsModel = require("../../models/department");
const departmentsSubModel = require("../../models/departmentSub");
const { default: mongoose } = require("mongoose");

exports.getAll = async (req, res) => {};

exports.create = async (req, res) => {};

exports.userTickets = async (req, res) => {};

exports.departments = async (req, res) => {
  const department = await departmentsModel.find({}, "title").lean();

  return res.json(department);
};

exports.departmentsSub = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(422).json({ message: "Department sub ID not valid !" });
  }
  const departmentSub = await departmentsSubModel
    .find({ parent: id }, "title")
    .lean();

  if (departmentSub != true) {
    return res.status(404).json({ message: "Department sub not found ! " });
  }
  return res.json(departmentSub);
};

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
