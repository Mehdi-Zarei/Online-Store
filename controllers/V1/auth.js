const usersModel = require("../../models/user");
const registerValidator = require("../../validators/register");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const validatorResult = registerValidator(req.body);
  if (validatorResult != true) {
    return res.status(422).json(validatorResult);
  }
  const { name, userName, email, phone, password } = req.body;

  const isUserExists = await usersModel.findOne({
    $or: [{ userName }, { email }, { phone }],
  });

  if (isUserExists) {
    if (isUserExists.userName === userName) {
      return res.status(409).json({ message: "User name is already exist" });
    } else if (isUserExists.email === email) {
      return res.status(409).json({ message: "Email is already in use" });
    } else if (isUserExists.phone === phone) {
      return res
        .status(409)
        .json({ message: "Phone number is already registered" });
    }
  }

  const countUsers = await usersModel.countDocuments();

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await usersModel.create({
    name,
    userName,
    email,
    phone,
    password: hashedPassword,
    role: countUsers > 0 ? "USER" : "ADMIN",
  });

  const userObject = newUser.toObject();
  Reflect.deleteProperty(userObject, "password");

  const accessToken = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: "30 day",
  });

  return res.status(201).json({ newUser: userObject, accessToken });
};

exports.login = async (req, res) => {};

exports.getMe = async (req, res) => {};
