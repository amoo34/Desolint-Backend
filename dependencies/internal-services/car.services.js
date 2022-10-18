// importing required packages and modules
const mongoose = require(`mongoose`);
const { logWarning, logError } = require(`../helpers/console.helpers`);
const fs = require("fs");
const fsPromise = require("fs").promises;
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
  SERVER_ADDRESS,
  API_BASE_URL,
} = require(`../config`);

// requiring required schemas
const Car = require(`../../api/models/car.model`);

const saveCar = async (carData, filePath) => {
  try {
    // creating an object to store new Car
    const car = new Car({
      _id: new mongoose.Types.ObjectId(),
      model: carData.model,
      price: carData.price,
      phone: carData.phone,
      userId: carData.userId,
      city: carData.city,
      copies: carData.copies,
      images: filePath,
    });

    // saving new Car in the database
    const result = await car.save();

    // returning saved Car to its caller
    return {
      status: CREATED,
      data: result,
    };
  } catch (error) {
    // this code runs in case of an error @ runtime

    // logging error messages to the console
    logError(`ERROR @ Add -> car.services.js`, error);

    // returning response to indicate failure to its caller

    return { status: SERVER_ERROR, data: null, error: error };
  }
};

// This is used when we send Base64 from Front-end
// currently I am implementing using multer so not part of the flow (Added just for an example)
const saveCarImage = async (userId, imageArray) => {
  try {
    let filePath = [];
    let fileWritePromises = [];
    imageArray.forEach(async (imageBase64) => {
      let base64 = imageBase64;

      //retrieve file extention from base64 string
      let extension = String(base64).match(/[^:/]\w+(?=;|,)/)[0];

      //extracting image from base64
      let base64Image = base64.split("base64,")[1];

      //creating fodler in projects directory
      let pathToMakeFolder = `./public/image/${userId}/`;

      // creating folder if it has not been created yet
      if (!fs.existsSync(pathToMakeFolder)) {
        fs.mkdirSync(`./public/car/${userId}/`, { recursive: true });
      }

      // creating file path
      let filePathDir = `./public/car/${userId}/macbook.${extension}`;

      // writing file
      fileWritePromises.push(
        fsPromise.writeFile(filePathDir, base64Image, "base64")
      );
      // , async (err) => {
      // if (err) {
      // return res.status(httpsStatus.BAD_GATEWAY).json({
      //     message: "Error in saving pdf",
      //     error: err,
      // });
      // }
      // else{
      let filePaths = filePathDir.split("./")[1];
      filePath.push(`${API_BASE_URL}/${filePaths}`);
      // }
    });

    await Promise.all(fileWritePromises);

    return { status: CREATED, data: filePath, error: null };

    // filePath = filePath.split("./")[1];
    // filePath = `${SERVER_ADDRESS}/${filePath}`;
    // }
    // )
  } catch (error) {
    return { status: SERVER_ERROR, data: null, error: error };
  }
};

module.exports = {
  saveCar,
  saveCarImage,
};
