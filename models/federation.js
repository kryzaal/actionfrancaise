var dbHandler = require(document_root + '/database').handler;

function exists(code, callback) {
	dbHandler.get("SELECT 1 FROM federations WHERE code_federation == ? LIMIT 1", code, function(err, data) {
		if(err) callback(err, undefined);
		else if(nullOrEmpty(data)) callback(err, false);
		else callback(err, data['1'] > 0);
	});
}

function fetchAll (callback) {
	dbHandler.all("SELECT code_federation FROM federations", {}, function(err, data) {
		if(err) callback(err, undefined);
		else if(!data) callback(err, []);
		else {
			var array = [];
			data.forEach(function(row) {
				array.push(row.code_federation);
			});
			callback(err, array);
		}
	});
}

function fetchOne(code, callback) {
	dbHandler.get("SELECT federations.code_federation AS code, entites.nom, entites.nom_court, entites.description FROM federations " + 
		"INNER JOIN entites ON entites.code == federations.code_entite WHERE code_federation == ?", code, callback);
}

function fetchMembres(code, callback) {
	dbHandler.all("SELECT membres_entites.code_profil, membres_entites.dirigeant FROM federations " + 
		"INNER JOIN membres_entites ON membres_entites.code_entite == federations.code_entite WHERE code_federation == ?", code, callback);
}

function fetchSections(code, callback) {
	dbHandler.all("SELECT code_section FROM sections WHERE code_federation == ?", code, function(err, rows) {
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

function fetchContact(code, callback) {
	dbHandler.get("SELECT contactable.facebook, contactable.twitter, contactable.site, contactable.youtube FROM federations " +
		"INNER JOIN contactable ON contactable.code == federations.code_entite WHERE code_federation == ?", code, callback);
}

exports.fetchAll = fetchAll;
exports.fetchOne = fetchOne;
exports.fetchMembres = fetchMembres;
exports.fetchSections = fetchSections;
exports.fetchContact = fetchContact;
exports.exists = exists;