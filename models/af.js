var dbHandler = require(document_root + '/database').handler;

function fetchOne(code, callback) {
	dbHandler.get("SELECT entites.* FROM section_af INNER JOIN entites ON entites.code == section_af.code_entite WHERE code_section == ?", code, callback);
}

function fetchMembres(code, callback) {
	dbHandler.all("SELECT membres_entites.code_profil, membres_entites.dirigeant FROM section_af " + 
		"INNER JOIN membres_entites ON membres_entites.code_entite == section_af.code_entite WHERE code_section == ?", code, callback);
}

function fetchContact(code, callback) {
	dbHandler.get("SELECT contactable.facebook, contactable.twitter, contactable.site FROM section_af " + 
		"INNER JOIN contactable ON contactable.code == section_af.code_entite WHERE code_section == ?", code, callback);
}

function exists(code, callback) {
	dbHandler.get("SELECT (COUNT(*) > 0) FROM federations WHERE code_federation == ?", code, callback);
}

exports.fetchOne = fetchOne;
exports.fetchMembres = fetchMembres;
exports.fetchContact = fetchContact;
exports.exists = exists;