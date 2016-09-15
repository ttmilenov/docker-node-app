var express = require('express');
var service = require('../core/get-image-core')
var router = express.Router();

/**
 * GET /get-image?image=
 * 
 * Gets an image from the image directory. The image is specified by the image query parameter.
 * 
 * @parameter image - the name of the image to return.
 * @returns the encoded image.s
 */
router.get('/get-image', function(req, res, next) {
  service.getImage(req.url, function(result, error) {
    if (error) {
      next(error);
    } else {
      res.writeHead(200, {
        'Content-Type': 'image/png'
      });

      res.end(result, 'binary');
    }
  });

});

module.exports = router;
