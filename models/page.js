var dbHandler = require(document_root + '/database').handler;

function exists(code, callback) {
	dbHandler.get("SELECT 1 FROM pages WHERE categorie == ? AND code == ? LIMIT 1", [categorie, code], function(err, data) {
		if(err) callback(err, undefined);
		else if(nullOrEmpty(data)) callback(err, false);
		else callback(err, data['1'] > 0);
	});
}

exports.fetchOne = function(categorie, code, callback) {
	dbHandler.get("SELECT titre, texte FROM pages WHERE categorie == ? AND code == ?", [categorie, code], function(err, row) {
		if(err || !row) callback(err, undefined);
		else callback(err, {
			code: code,
			categorie: categorie,
			titre: row['titre'],
			texte: row['texte']
		})
	});
}

exports.fetchList = function(categorie, callback) {
	dbHandler.all("SELECT code FROM pages WHERE categorie == ?", categorie, function(err, rows) {
		if(err || !rows) callback(err, undefined);
		else {
			var data = [];
			rows.forEach(function(row) {
				data.push(row['code']);
			});
			callback(err, data);
		}
	});
}

exports.exists = exists;