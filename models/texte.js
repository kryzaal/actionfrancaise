var dbHandler = require(document_root + '/database').handler;

exports.fetchOne = function(code, callback) {
	if(nullOrEmpty(code)) callback("Code is null or undefined", undefined);
	dbHandler.get("SELECT profil_auteur, titre, ss_titre, date_creation FROM textes " +
		"WHERE code == ?", code, callback);
}

exports.fetchForProfil = function(code_profil, callback) {
	if(nullOrEmpty(code_profil)) callback("code_profil is null or undefined", undefined);
	dbHandler.all("SELECT code, type FROM textes " +
		"WHERE profil_auteur == ?", code_profil, callback);
}