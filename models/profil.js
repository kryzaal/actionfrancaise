var dbHandler = require(document_root + '/database').handler;

function exists(code, callback) {
	dbHandler.get("SELECT 1 FROM profils WHERE code == ? LIMIT 1", code, function(err, data) {
		if(err) callback(err, undefined);
		else if(nullOrEmpty(data)) callback(err, false);
		else callback(err, data['1'] > 0);
	});
}

exports.fetchOne = function(code, callback) {
	dbHandler.get("SELECT nom, titre, biographie, contactable FROM profils WHERE code == ?", code, function(err, row) {
		if(err || !row) callback(err, undefined);
		else callback(err, {
			code: code,
			nom: row['nom'],
			titre: row['titre'],
			biographie: row['biographie'],
			contactable: row['contactable'] == '1'
		});
	});
}

exports.fetchWidget = function(code, callback) {
	dbHandler.get("SELECT nom, titre FROM profils WHERE code == ?", code, function(err, row) {
		if(err || nullOrEmpty(row)) callback(err, undefined);
		else callback(err, {
			code: code,
			nom: row['nom'],
			titre: row['titre']
		});
	});
}

exports.exists = exists;