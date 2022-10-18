const util = require("util");
const path = require("path");
const multer = require("multer");


var storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, 'public');
    },
    filename: function (req, file, callback) {
      callback(null, file.originalname);
    }
  });
  
  var upload = multer({ storage : storage }).array('images',6);

// var uploadFiles = multer({ storage: storage }).array("multi-files", 10);
// var uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = upload;