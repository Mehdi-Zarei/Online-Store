const ticketsModel = require("../../models/ticket");
const departmentsModel = require("../../models/department");
const departmentsSubModel = require("../../models/departmentSub");
const { default: mongoose } = require("mongoose");

exports.getAll = async (req, res) => {
  try {
    const tickets = await ticketsModel
      .find({})
      .populate("user", "name")
      .populate("course", "name")
      .populate("departmentID", "title")
      .populate("departmentSubID", "title");

    return res.json(tickets);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.create = async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.userTickets = async (req, res) => {
  try {
    const ticket = await ticketsModel
      .find({ user: req.user._id })
      .sort({ _id: -1 })
      .populate("departmentID", "title")
      .populate("departmentSubID", "title")
      .populate("user", "name")
      .lean();

    return res.json(ticket);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.departments = async (req, res) => {
  try {
    const department = await departmentsModel.find({}, "title").lean();

    return res.json(department);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.departmentsSub = async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.setAnswer = async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getAnswer = async (req, res) => {
  try {
    const { id } = req.params;

    const ticket = await ticketsModel.findOne({ _id: id });

    const ticketAnswer = await ticketsModel.findOne({ mainTicketID: id });

    return res.json({ ticket, ticketAnswer });
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(409).json({ message: "Ticket ID not valid !" });
    }

    const remove = await ticketsModel.findOneAndDelete({ _id: id });

    if (!remove) {
      return res.status(404).json({ message: "Ticket not found !" });
    }

    return res.status(200).json({ message: "Ticket removed successfully." });
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.createDepartments = async (req, res) => {
  try {
    const { title } = req.body;

    const department = await departmentsModel.create({ title });

    return res.status(201).json(department);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.createDepartmentSub = async (req, res) => {
  try {
    const { title, parent } = req.body;

    const departmentSub = await departmentsSubModel.create({ title, parent });

    return res.status(201).json(departmentSub);
  } catch (error) {
    return res.status(500).json(error);
  }
};
