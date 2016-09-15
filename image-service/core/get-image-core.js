var url = require('url');
var fs = require('fs');
var path = require('path');

var dbConnection = require('./db-connection')
var imagePathsService = require('./get-images-core');

var imagesPath = path.join(__dirname, '../public/images');

module.exports.getImage = function (req_url, callback) {

  var queryParam = url.parse(req_url, true).query.image;

  imagePathsService.getImagePath(queryParam, function (result) {
    
    fs.readFile(path.join(imagesPath, result), function (error, data) {
      if (error) {
        var _err = new Error('File not found!');
        _err.status = 404;
        callback(null, _err);
      } else {
        callback(data, null);
      }
    });
    
  });

}
