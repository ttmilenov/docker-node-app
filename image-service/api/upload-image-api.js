var express = require('express');
var multer = require('multer');
var fs = require('fs');

var uploadImageService = require('../core/upload-image-core');

var router = express.Router();

var imagesPath = "./public/images";

var imageExtensions = [
  'jpeg',
  'png',
  'gif',
  'jpg'
];

/**
 * Middleware function for specifying the way the multipart-data
 * requests` files are being stored on the file system.
 */
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/images');
  },

  filename: function (req, file, callback) {
    var fileExtension = extractMimeExtension(file.mimetype);

    if (imageExtensions.indexOf(fileExtension) === -1) {
      callback(generateError(404, 'File type not supported!'));
    } else {
      callback(null, file.fieldname + '-' + Date.now() + "." + extractMimeExtension(file.mimetype));
    }
  }
});

var upload = multer({
  storage: storage
}).single('image');

/**
 * POST /upload-image
 * 
 * Upload an image to the server.
 * Accepts multipart-form-data requests.
 * 
 * @param the file image
 */
router.post('/upload-image', function (req, res, next) {
  upload(req, res, function (err) {
    if (err) {
      next(err);
    } else {

      if (!req.file) {
        next(generateError(400, 'File must not be empty!'));
      } else {

        uploadImageService.storeImagePath({
          name: req.body.text,
          env_path: req.file.filename
        });
        res.end("File is uploaded");
      }
    }
  });
});

/**
 * Extracts the type of the file recieved.
 * Only jpeg, png, gif and jpg types are allowed as the
 * imageExtensions variable shows.
 */
function extractMimeExtension(mimetype) {
  var extension = mimetype.substr(mimetype.indexOf("/") + 1);
  return extension;
};

function generateError(code, message) {
  var error = new Error(message);
  error.status = code;
  return error;
};

module.exports = router;
