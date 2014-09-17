var dbHandler = require(document_root + '/database').handler;

function fetch(callback) {
	dbHandler.get("SELECT nom_court, nom, description FROM entites WHERE code == ?", 'craf', callback);
}

function contact(callback) {
	dbHandler.get("SELECT facebook, twitter, site FROM contactable WHERE code == ?", 'craf', callback);
}

function membres(callback) {
	dbHandler.get("SELECT code_profil, dirigeant FROM membres_entites WHERE code_entite == ?", 'craf', callback);
}

exports.fetch = fetch;
exports.contact = contact;
exports.membres = membres;