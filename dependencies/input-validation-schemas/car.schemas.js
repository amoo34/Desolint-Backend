// importing required packages and modules
const Joi = require(`joi`);

// importing required custom data validators
const { objectIdValidation } = require(`../helpers/joi.helpers`);



// defining validation schema for adding a new Car
const createCarSchema = Joi.object({

  model: Joi.string().required(),
  price: Joi.string().required(),
  phone: Joi.string().required(),
  userId: Joi.string().required(),
  city: Joi.string().required(),
  copies: Joi.string().required(),
  images: Joi.array().items(Joi.string())

});

module.exports = {
    createCarSchema
}