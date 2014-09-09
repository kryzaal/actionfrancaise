var dbHandler = require(document_root + '/database').handler;

exports.exists = function(categorie, code, callback) {
	if(nullOrEmpty(code)) callback("code is null or undefined", false);
	if(nullOrEmpty(categorie)) callback("categorie is null or undefined", false);
	dbHandler.get("SELECT COUNT(*) > 0 FROM pages WHERE categorie == ? AND code == ?", [categorie, code], callback);
}

exports.fetchOne = function(categorie, code, callback) {
	if(nullOrEmpty(categorie)) callback("categorie is null or undefined", false);
	if(nullOrEmpty(code)) callback("Code is null or undefined", undefined);
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
	if(nullOrEmpty(categorie)) callback("categorie is null or undefined", false);
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