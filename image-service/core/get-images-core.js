var dbConnection = require('./db-connection');
var getImagesSQL = 'select name from image_app.images;'
var getImagePathSQL = 'select env_path from image_app.images where name = ?;';

module.exports.getImagePaths = function (callback) {
  dbConnection.query(getImagesSQL, function (err, rows, fields) {
    if (err) {
      throw new Error(err);
    }
    callback(rows);
  });
}

module.exports.getImagePath = function (path, callback) {
  dbConnection.query(getImagePathSQL, path, function (err, result) {
    if (err) {
      throw new Error(err);
    }
    if (!!result[0]) {
      callback(result[0].env_path);
    } else {
      callback('');
    }
  });
}
