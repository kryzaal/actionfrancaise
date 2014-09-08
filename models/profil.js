var dbHandler = require(document_root + '/database').handler;

exports.exists = function(code, callback) {
	dbHandler.get("SELECT COUNT(*) > 0 FROM profils WHERE code == ?", code, callback);
}

exports.fetchOne = function(code, callback) {
	dbHandler.get("SELECT nom, titre, biographie, contactable FROM profils WHERE code == ?", code, function(err, row) {
		callback(err, {
			code: code,
			nom: row['nom'],
			titre: row['titre'],
			biographie: row['biographie'],
			contactable: row['contactable'] == '1'
		})
	});
}

exports.fetchWidget = function(code, callback) {
	dbHandler.get("SELECT nom, titre FROM profils WHERE code == ?", code, function(err, row) {
		callback(err, {
			code: code,
			nom: row['nom'],
			titre: row['titre']
		})
	});
}