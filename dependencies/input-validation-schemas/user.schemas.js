// importing required packages and modules
const { required } = require("joi");
const Joi = require(`joi`);

// importing required custom data validators
const { objectIdValidation } = require(`../helpers/joi.helpers`);

// defining validation schema for adding a new system role
const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

// exporting as modules
module.exports = {
  loginSchema
};