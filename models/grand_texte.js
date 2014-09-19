var dbHandler = require(document_root + '/database').handler;
var texteModel = require('./texte');

function exists(code, callback) {
	dbHandler.get("SELECT 1 FROM grands_textes WHERE code_texte == ? LIMIT 1", code, function(err, data) {
		if(err) callback(err, undefined);
		else if(nullOrEmpty(data)) callback(err, false);
		else callback(err, data['1'] > 0);
	});
}

function list_codes(callback) {
	dbHandler.all("SELECT code_texte AS code FROM grands_textes", {}, function(err, rows) {
		var codes = [];
		rows.forEach(function(row) { codes.push(row.code); });
		callback(err, codes);
	});
}

function list_keywords(callback) {
	texteModel.listKeywords(function(err, parentData) {
		if(err) callback(err, parentData);
		else dbHandler.all("SELECT code_text AS code, texte FROM grands_textes", {}, function(err, data) {
			var keywords = [];
			data.forEach(function(row) {
				keywords[row.code] = parentData[row.code] + ' ' + row.texte;
			});
			callback(err, keywords);
		});
	});
}

function fetchOne(code, callback) {
	dbHandler.get("SELECT profil_auteur, titre, ss_titre, texte FROM grands_textes " +
		"INNER JOIN textes ON textes.code == grands_textes.code_texte WHERE grands_textes.code_texte == ?", code, callback);
}

exports.exists = exists;
exports.fetchOne = fetchOne;
exports.list_codes = list_codes;
exports.list_keywords = list_keywords;