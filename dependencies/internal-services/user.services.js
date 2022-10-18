// importing required packages and modules
const mongoose = require(`mongoose`);
const { logWarning, logError, logInfo } = require(`../helpers/console.helpers`);
const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// importing required config params
const {
  HTTP_STATUS_CODES: {
    SUCCESS,
    CREATED,
    BAD_REQUEST,
    UNAUTHORIZED,
    FORBIDDEN,
    NOT_FOUND,
    CONFLICT,
    SERVER_ERROR,
  },
} = require(`../config`);

// requiring required schemas
const User = require(`../../api/models/user.model`);

// this service is used for user Login purpose
const login = async (userData) => {
  try {
    const { email, password } = userData;

    const result = await User.findOne({ email: email });
    let passwordCheck = null;

    if (result === null) {
      return {
        status: NOT_FOUND,
        data: "User Not Found",
      };
    } else if (result) {
      passwordCheck = await bcrypt.compare(password, result.password);
    }

    logInfo("password check: ", password);

    if (!passwordCheck) {
      return {
        status: UNAUTHORIZED,
        data: "Entered Wrong Credentials",
      };
    }

    let payload = {
      email: userData.email,
      id: result._id,
    };

    let token = await JWT.sign({ payload }, "test", { expiresIn: 240000 });

    payload["token"] = token;

    if (!result) {
      return {
        status: NOT_FOUND,
        data: "USER NOT FOUND",
      };
    }

    // returning Data
    return {
      status: SUCCESS,
      data: payload,
    };
  } catch (error) {
    // this code runs in case of an error @ runtime

    // logging error messages to the console
    logError(`ERROR @ Login user -> user.services.js`, error);

    // returning response to indicate failure to its caller
    return {
      status: SERVER_ERROR,
      error: "Internal Server Error",
    };
  }
};

// exporting controllers as modules
module.exports = {
  login,
};
