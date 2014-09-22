var dbHandler = require(document_root + '/database').handler;

function exists(code, callback) {
	dbHandler.get("SELECT 1 FROM sections WHERE code_section == ? LIMIT 1", code, function(err, data) {
		if(err) callback(err, undefined);
		else if(nullOrEmpty(data)) callback(err, false);
		else callback(err, data['1'] > 0);
	});
}

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
	dbHandler.get("SELECT sections.code_section AS code, entites.nom_court, entites.nom, entites.description, code_federation FROM sections " + 
		"INNER JOIN entites ON entites.code == sections.code_entite WHERE code_section == ?", code, callback);
}

function fetchMembres(code, callback) {
	dbHandler.all("SELECT membres_entites.code_profil, membres_entites.dirigeant FROM sections " + 
		"INNER JOIN membres_entites ON membres_entites.code_entite == sections.code_entite WHERE code_section == ?", code, callback);
}

function fetchContact(code, callback) {
	dbHandler.get("SELECT contactable.facebook, contactable.twitter, contactable.site FROM sections " + 
		"INNER JOIN contactable ON contactable.code == sections.code_entite WHERE code_section == ?", code, callback);
}

exports.fetchAll = fetchAll;
exports.fetchOne = fetchOne;
exports.fetchMembres = fetchMembres;
exports.fetchContact = fetchContact;
exports.exists = exists;