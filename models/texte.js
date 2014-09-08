var dbHandler = require(document_root + '/database').handler;

exports.fetchOne = function(code, callback) {
	if(nullOrEmpty(code)) callback("Code is null or undefined", undefined);
	dbHandler.get("SELECT profil_auteur, titre, ss_titre, date_creation FROM textes " +
		"WHERE code == ?", code, callback);
}