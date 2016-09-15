var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var getEncodedImages = require('./api/get-image-api');
var getImages = require('./api/get-images-api');
var uploadImage = require('./api/upload-image-api')

// Initiate Express application
var app = express();

// Set app middleware functions
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
  keepExtensions: true
}));
app.use(express.static('public'));

// Set endpoint listeners
app.use('/', getEncodedImages);
app.use('/', getImages);
app.use('/', uploadImage);

// Middleware error handlers
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  console.log(err);
  res.status(err.status || 500)
  res.send(JSON.stringify({
    error: err,
    message: err.message
  }))
})

module.exports = app;
