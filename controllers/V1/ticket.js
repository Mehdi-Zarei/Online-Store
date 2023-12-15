const ticketsModel = require("../../models/ticket");
const departmentsModel = require("../../models/department");
const departmentsSubModel = require("../../models/departmentSub");
const { default: mongoose } = require("mongoose");

exports.getAll = async (req, res) => {
  const tickets = await ticketsModel
    .find({})
    .populate("user", "name")
    .populate("course", "name")
    .populate("departmentID", "title")
    .populate("departmentSubID", "title");

  return res.json(tickets);
};

exports.create = async (req, res) => {
  const { departmentID, departmentSubID, priority, title, body, course } =
    req.body;

  const newTicket = await ticketsModel.create({
    departmentID,
    departmentSubID,
    priority,
    title,
    body,
    course,
    user: req.user._id,
    answer: 0,
    isAnswer: 0,
  });

  const mainTicket = await ticketsModel
    .findOne({ _id: newTicket._id })
    .populate("user", "name")
    .populate("course", "name")
    .populate("departmentID", "title")
    .populate("departmentSubID", "title");

  return res.status(201).json(mainTicket);
};

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

exports.setAnswer = async (req, res) => {
  const { body, ticketID } = req.body;

  const ticket = await ticketsModel.findOne({ _id: ticketID });

  const answer = await ticketsModel.create({
    title: "پاسخ تیکت شما",
    body,
    ticketID,
    departmentID: ticket.departmentID,
    departmentSubID: ticket.departmentSubID,
    priority: ticket.priority,
    course: ticket.course,
    user: req.user._id,
    mainTicketID: ticketID,
    answer: 0,
    isAnswer: 1,
  });

  await ticketsModel.findOneAndUpdate({ _id: ticketID }, { answer: 1 });

  return res.status(201).json(answer);
};

exports.getAnswer = async (req, res) => {
  const { id } = req.params;

  const ticket = await ticketsModel.findOne({ _id: id });

  const ticketAnswer = await ticketsModel.findOne({ mainTicketID: id });

  return res.json({ ticket, ticketAnswer });
};

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
