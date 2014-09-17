var folder = require(document_root + '/lib/folder');
var sectionsFolder = new folder.Folder(document_root + '/data/entites/');

function get(request, response) {
	send501(response, true);
}

function logo(request, response) {
	sectionsFolder.fileToBinary(response, 'craf.png', 'image/png');
}

function contact(request, response) {
	send501(response, true);
}

function membres(request, response) {
	send501(response, true);
}

exports.get = get;
exports.logo = logo;
exports.contact = contact;
exports.membres = membres;