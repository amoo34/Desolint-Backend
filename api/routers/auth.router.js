// importing required modules
const express = require(`express`);

const { validateInput } = require(`../middlewares/input-validation.middleware`);

// importing required data validators
const {
  loginSchema,
} = require(`../../dependencies/input-validation-schemas/user.schemas`);

// importing required controllers
const { loginUser } = require(`../controllers/auth.controllers`);

// creating router
const authRouter = express.Router();

// 1-> route for Login
authRouter.post(`/login`, validateInput(loginSchema, `BODY`), loginUser);

// exporting router as a module
module.exports = {
  authRouter,
};
