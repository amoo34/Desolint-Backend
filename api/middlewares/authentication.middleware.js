// importing required packages and modules
const {
  logInfo,
  logError,
} = require(`../../dependencies/helpers/console.helpers`);
const jwt = require("jsonwebtoken");
// importing required config params
const {
  HTTP_STATUS_CODES: { BAD_REQUEST, UNAUTHORIZED, FORBIDDEN, SERVER_ERROR },
} = require(`../../dependencies/config`);

// this middleware authenticates incoming request and
// allows/rejects access to the protected resources
const authenticateRequest = async (req, res, next) => {
  try {
    // REQUEST AUTHENTICATION LOGIC GOES HERE

    // checking the response from helper
    if (!req.headers.authorization) {
      return res.status(UNAUTHORIZED).json({
        error: `Authentication failed. Please send Token.`,
        hasError: true,
      });
    } else {
      /* FETCH FIRST PART OF THE TOKEN SENT IN HEADERS */
      const token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, "test");

      // req.userData = decoded;

      if (!decoded) {
        return res.status(UNAUTHORIZED).json({
          error: `Your access has been terminated`,
          hasError: true,
        });
      }

      next();
    }

    // forwarding request to the next handler
    // next();
  } catch (error) {
    // this code runs in case of an ERROR @ runtime

    // logging error messages to the console
    logError(
      `ERROR @ authenticateRequest -> authentication.middleware.js`,
      error
    );

    // returning the response with an error message
    return res.status(SERVER_ERROR).json({
      hasError: true,
      message: `ERROR: Requested Operation Failed.`,
      error: {
        error,
      },
    });
  }
};

// exporting middleware as a module
module.exports = {
  authenticateRequest,
};
