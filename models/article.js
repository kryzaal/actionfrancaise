var dbHandler = require(document_root + '/database').handler;
var texteModel = require('./texte');

exports.exists = function(code, callback) {
	if(nullOrEmpty(code)) callback("Code is null or undefined", false);
	dbHandler.get("SELECT COUNT(*) > 0 FROM articles WHERE code == ?", code, callback);
}

function listCodes(callback) {
	dbHandler.all("SELECT code FROM articles", {}, function(err, rows) {
		var codes = [];
		rows.forEach(function(row) { codes.push(row.code); });
		callback(err, codes);
	});
}

function listKeywords(callback) {
	dbHandler.all("SELECT code, keywords FROM articles", {}, callback);
}

function fetchLatestVersion(code, callback) {
	dbHandler.get("SELECT compte_editeur, texte, date_edition FROM versions_articles " +
		"WHERE code_article == ? " +
		"ORDER BY date_edition DESC LIMIT 1", code, callback);
}

function fetchOne(code, callback) {
	if(nullOrEmpty(code)) callback("Code is null or undefined", undefined);
	var data = {code : code};

	texteModel.fetchOne(code, function(err, parentData) {
		if(err) callback(err, data);
		else {
			data.auteur = parentData.profil_auteur;
			data.titre = parentData.titre;
			data.ss_titre = parentData.ss_titre;
			data.creation = parentData.date_creation;

			fetchLatestVersion(code, function(err, versionData) {
				if(err) callback(err, data);
				else {
					data.editeur = versionData.editeur;
					data.texte = versionData.texte;
					data.edition = versionData.date_edition;
					callback(false, data);
				}
			});
		}
	});
}

exports.fetchOne = fetchOne;
exports.listCodes = listCodes;
exports.listKeywords = listKeywords;