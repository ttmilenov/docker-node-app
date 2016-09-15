var express = require('express');
var service = require('../core/get-images-core')
var router = express.Router();

/**
 * GET /get-images
 * 
 * Returns all image names stored on file.
 * 
 */
router.get('/get-images', function (req, res, next) {
	service.getImagePaths(function (queryResult) {
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify(queryResult, null, 3));
	});

})

module.exports = router;