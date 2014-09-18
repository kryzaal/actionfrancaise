var dbHandler = require(document_root + '/database').handler;

function fetchAll (callback) {
	dbHandler.all("SELECT code_section FROM sections", {}, function(err, data) {
		if(err) callback(err, undefined);
		else if(!data) callback(err, []);
		else {
			var array = [];
			data.forEach(function(row) {
				array.push(row.code_section);
			});
			callback(err, array);
		}
	});
}

function fetchOne(code, callback) {
	dbHandler.get("SELECT entites.* FROM sections INNER JOIN entites ON entites.code == sections.code_entite WHERE code_section == ?", code, callback);
}

function fetchMembres(code, callback) {
	dbHandler.all("SELECT membres_entites.code_profil, membres_entites.dirigeant FROM sections " + 
		"INNER JOIN membres_entites ON membres_entites.code_entite == sections.code_entite WHERE code_section == ?", code, callback);
}

function fetchFederation(code, callback) {
	dbHandler.get("SELECT code_federation FROM sections WHERE code_section == ?", code, callback);
}

function fetchContact(code, callback) {
	dbHandler.get("SELECT contactable.facebook, contactable.twitter, contactable.site FROM sections " + 
		"INNER JOIN contactable ON contactable.code == sections.code_entite WHERE code_section == ?", code, callback);
}

function exists(code, callback) {
	dbHandler.get("SELECT (COUNT(*) > 0) FROM sections WHERE code_section == ?", code, callback);
}

exports.fetchAll = fetchAll;
exports.fetchOne = fetchOne;
exports.fetchMembres = fetchMembres;
exports.fetchFederation = fetchFederation;
exports.fetchContact = fetchContact;
exports.exists = exists;