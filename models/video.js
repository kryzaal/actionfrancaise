var dbHandler = require(document_root + '/database').handler;

exports.fetchCodes = function(list_code, callback) {
	dbHandler.all("SELECT video FROM listes_videos WHERE liste == ?", list_code, function(err, rows) {
		var codes = [];
		rows.forEach(function(row) { codes.push(row.video); });
		callback(err, codes);
	})
};