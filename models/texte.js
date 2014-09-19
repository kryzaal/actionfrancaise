var dbHandler = require(document_root + '/database').handler;

exports.fetchOne = function(code, callback) {
	dbHandler.get("SELECT profil_auteur, titre, ss_titre, date_creation FROM textes " +
		"WHERE code == ?", code, callback);
}

exports.fetchForProfil = function(code_profil, callback) {
	dbHandler.all("SELECT code, type FROM textes " +
		"WHERE profil_auteur == ?", code_profil, callback);
}