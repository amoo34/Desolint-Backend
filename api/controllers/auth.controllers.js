// importing required packages and modules
const {
  logWarning,
  logError,
} = require(`../../dependencies/helpers/console.helpers`);

// importing required data services
const { login } = require(`../../dependencies/internal-services/user.services`);

// importing response status codes
const {
  HTTP_STATUS_CODES: {
    SUCCESS,
    CREATED,
    BAD_REQUEST,
    NOT_FOUND,
    CONFLICT,
    SERVER_ERROR,
    UNAUTHORIZED,
  },
} = require(`../../dependencies/config`);
const userModel = require("../models/user.model");

// this controller takes data via incoming request body and creates a new system
// role in the database.
const loginUser = async (req, res, next) => {
  try {
    const { status, data, error } = await login(req.body);

    // checking the result of the operation
    if (status === SERVER_ERROR) {
      // this code runs in case data service failed due to
      // unknown database error

      // logging error message to the console
      logError(`Requested operation failed. Unknown database error.`);

      // returning the response with an error message
      return res.status(SERVER_ERROR).json({
        hasError: true,
        message: `ERROR: Requested operation failed.`,
        error: {
          error,
        },
      });
    } else if (status === CONFLICT) {
      // this code runs in case data service failed due to
      // duplication value

      // logging error message to the console
      logError(
        `Requested operation failed. System role with duplicate field(s) exists.`
      );

      // returning the response with an error message
      return res.status(CONFLICT).json({
        hasError: true,
        message: `ERROR: Requested operation failed.`,
        error: {
          error,
        },
      });
    } else if (status === NOT_FOUND) {
      // this code runs in case data service failed due to
      // duplication value

      // logging error message to the console
      logError(`Requested operation failed. User not Found.`);

      // returning the response with an error message
      return res.status(NOT_FOUND).json({
        hasError: true,
        message: data,
      });
    } else if (status === UNAUTHORIZED) {
      return res.status(UNAUTHORIZED).json({
        hasError: true,
        message: data,
      });
    }

    // returning the response with success message
    return res.status(CREATED).json({
      hasError: false,
      message: `SUCCESS: Logged In`,
      data,
    });
  } catch (error) {
    // this code runs in case of an error @ runtime

    // logging error messages to the console
    logError(`ERROR @ Login user -> auth.controllers.js`, error);

    // returning response with an error message
    return res.status(SERVER_ERROR).json({
      hasError: true,
      message: `ERROR: Requested operation failed.`,
      error: {
        error: `An unhandled exception occured on the server.`,
      },
    });
  }
};

// exporting controllers as modules
module.exports = {
  loginUser,
};
