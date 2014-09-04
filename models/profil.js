var dbHandler = require(document_root + '/database').handler;

exports.exists = function(code, callback) {
	dbHandler.get("SELECT COUNT(*) > 0 FROM profils WHERE code == ?", code, callback);
}

exports.fetchOne = function(code, callback) {
	dbHandler.get("SELECT * FROM profils WHERE code == ?", code, function(err, row) {
		callback(err, {
			code: row['code'],
			nom: row['nom'],
			titre: row['titre'],
			biographie: row['biographie'],
		})
	});
}