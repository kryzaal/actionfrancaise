var dbHandler = require(document_root + '/database').handler;

function fetchOne(code, callback) {
	dbHandler.get("SELECT entites.* FROM section_afe INNER JOIN entites ON entites.code == section_afe.code_entite WHERE code_section == ?", code, callback);
}

function fetchMembres(code, callback) {
	dbHandler.all("SELECT membres_entites.code_profil, membres_entites.dirigeant FROM section_afe " + 
		"INNER JOIN membres_entites ON membres_entites.code_entite == section_afe.code_entite WHERE code_section == ?", code, callback);
}

function fetchContact(code, callback) {
	dbHandler.get("SELECT contactable.facebook, contactable.twitter, contactable.site, contactable.youtube FROM section_afe " +
		"INNER JOIN contactable ON contactable.code == section_afe.code_entite WHERE code_section == ?", code, callback);
}

function exists(code, callback) {
	dbHandler.get("SELECT 1 FROM section_afe WHERE code_section == ? LIMIT 1", code, function(err, data) {
		if(err) callback(err, undefined);
		else if(nullOrEmpty(data)) callback(err, false);
		else callback(err, data['1'] > 0);
	});
}

exports.fetchOne = fetchOne;
exports.fetchMembres = fetchMembres;
exports.fetchContact = fetchContact;
exports.exists = exists;