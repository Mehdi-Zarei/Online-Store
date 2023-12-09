const Validator = require("fastest-validator");

const v = new Validator();

const schema = {
  message: { type: "string", min: 3, max: 50 },
  admin: { type: "string", min: 5, max: 50 },
  $$strict: true,
};

const check = v.compile(schema);

module.exports = check;
