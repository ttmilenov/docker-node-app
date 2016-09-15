var db = require('mysql');

var connection = db.createConnection({
	host: 'db',
	user: 'imageapp',
	password: 'imageapp',
	database: 'image_app'
});

connection.connect(function (err) {
	if (err) {
		console.error('error connecting: ' + err.stack);
		return;
	}
	console.log('Connected to db!')
});

module.exports = connection;
