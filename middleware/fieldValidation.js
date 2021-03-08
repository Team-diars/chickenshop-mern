const { validationResult } = require("express-validator");

const fieldValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.mapped()); //* mapped() returns object
  }
  next();
};

module.exports = {
  fieldValidation,
};
