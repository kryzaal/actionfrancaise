var dbHandler = require(document_root + '/database').handler;

exports.exists = function(code, callback) {
	if(nullOrEmpty(code)) callback("Code is null or undefined", false);
	dbHandler.get("SELECT COUNT(*) > 0 FROM profils WHERE code == ?", code, callback);
}

exports.fetchOne = function(code, callback) {
	if(nullOrEmpty(code)) callback("Code is null or undefined", undefined);
	dbHandler.get("SELECT nom, titre, biographie, contactable FROM profils WHERE code == ?", code, function(err, row) {
		if(err || !row) callback(err, undefined);
		else callback(err, {
			code: code,
			nom: row['nom'],
			titre: row['titre'],
			biographie: row['biographie'],
			contactable: row['contactable'] == '1'
		})
	});
}

exports.fetchWidget = function(code, callback) {
	if(nullOrEmpty(code)) callback("Code is null or undefined", undefined);
	dbHandler.get("SELECT nom, titre FROM profils WHERE code == ?", code, function(err, row) {
		if(err || nullOrEmpty(row)) callback(err, undefined);
		else callback(err, {
			code: code,
			nom: row['nom'],
			titre: row['titre']
		})
	});
}