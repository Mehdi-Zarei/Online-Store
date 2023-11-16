const Validator = require("fastest-validator");

const v = new Validator();

const schema = {
  name: { type: "string", min: 3, max: 15 },
  userName: { type: "string", min: 5, max: 15 },
  email: { type: "email", max: 100 },
  phone: { type: "string", length: 11 },
  password: { type: "string", min: 8 },
  confirmPassword: { type: "equal", field: "password" },
  $$strict: true,
};

const check = v.compile(schema);

module.exports = check;
