var dbHandler = require(document_root + '/database').handler;

function fetchOne(code, callback) {
	dbHandler.get("SELECT entites.* FROM section_afe INNER JOIN entites ON entites.code == section_afe.code_entite WHERE code_section == ?", code, callback);
}

function fetchMembres(code, callback) {
	dbHandler.all("SELECT membres_entites.code_profil, membres_entites.dirigeant FROM section_afe " + 
		"INNER JOIN membres_entites ON membres_entites.code_entite == section_afe.code_entite WHERE code_section == ?", code, callback);
}

function fetchContact(code, callback) {
	dbHandler.get("SELECT contactable.facebook, contactable.twitter, contactable.site FROM section_afe " + 
		"INNER JOIN contactable ON contactable.code == section_afe.code_entite WHERE code_section == ?", code, callback);
}

function exists(code, callback) {
	dbHandler.get("SELECT (COUNT(*) > 0) FROM section_afe WHERE code_section == ?", code, callback);
}

exports.fetchOne = fetchOne;
exports.fetchMembres = fetchMembres;
exports.fetchContact = fetchContact;
exports.exists = exists;