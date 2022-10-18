// importing required modules
const express = require(`express`);

// importing required middlewares
const {
  authenticateRequest,
} = require(`../middlewares/authentication.middleware`);
const { validateInput } = require(`../middlewares/input-validation.middleware`);

// importing required data validators
const {
  createCarSchema,
} = require(`../../dependencies/input-validation-schemas/car.schemas`);

// importing required controllers
const { addCar } = require(`../controllers/car.controllers`);

const carRouter = express.Router();

carRouter.post(
  `/add`,
  //   authenticateRequest,
  // authorizeRequest,
  // validateInput(createCarSchema, `BODY`),
  addCar
);

module.exports = {
  carRouter,
};
