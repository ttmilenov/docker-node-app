var dbConnection = require('./db-connection');
var insertImageSQL = 'insert into image_app.images set ?;';

module.exports.storeImagePath = function (post, callback) {
  dbConnection.query(insertImageSQL, post, function (err, result) {
    if (err) {
      throw new Error(err);
    }
  });
}