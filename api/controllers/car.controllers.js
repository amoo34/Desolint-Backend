// importing required packages and modules
const {
  logWarning,
  logError,
} = require(`../../dependencies/helpers/console.helpers`);

// importing required data services
const {
  saveCar,
} = require(`../../dependencies/internal-services/car.services`);

// importing response status codes
const {
  SERVER_ADDRESS,
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

const carModel = require("../models/car.model");
const upload = require("../middlewares/fileUploader.middleware");

const addCar = async (req, res, next) => {
  try {
    upload(req, res, async function (err) {
      if (err) {
        return res.status(SERVER_ERROR).json({
          hasError: true,
          message: `File failed to Save.`,
          error: {
            error: `An unhandled exception occured on the server.`,
          },
        });
      } else {
        let filePath = [];
        req.files.forEach((file) => {
          filePath.push(`${SERVER_ADDRESS}/public/${file.originalname}`);
        });

        const {
          status: status1,
          data: data1,
          error: error1,
        } = await saveCar(req.body, filePath);

        // checking the result of the operation
        if (status1 === SERVER_ERROR) {
          // this code runs in case data service failed due to
          // unknown database error

          // logging error message to the console
          logError(`Requested operation failed. Unknown database error.`);

          // returning the response with an error message
          return res.status(SERVER_ERROR).json({
            hasError: true,
            message: `ERROR: Requested operation failed.`,
            error: {
              error1,
            },
          });
        } else if (status1 === CONFLICT) {
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
              error1,
            },
          });
        }

        // returning the response with success message
        return res.status(CREATED).json({
          hasError: false,
          message: `SUCCESS: Car Added.`,
          data1,
        });
      }
      // res.end("File is uploaded");
    });
  } catch (error) {
    // this code runs in case of an error @ runtime

    // logging error messages to the console
    logError(`ERROR @ Add Car -> car.controllers.js`, error);

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
  addCar,
};
