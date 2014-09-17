var folder = require(document_root + '/lib/folder');
var sectionsFolder = new folder.Folder(document_root + '/data/entites/');
var model = require(document_root + '/models/craf');
var jsonLib = require(document_root + '/lib/json');

function get(request, response) {
	if(request.accepts("html")) {
		response.redirect('/organigramme/craf');
	} else { 
		var sender = new jsonLib.json(response);
		model.fetch(sender.send);
	}
}

function logo(request, response) {
	sectionsFolder.fileToBinary(response, 'craf.png', 'image/png');
}

function contact(request, response) {
	var sender = new jsonLib.json(response);
	model.contact(sender.send);
}

function membres(request, response) {
	var sender = new jsonLib.json(response);
	model.membres(sender.send);
}

exports.get = get;
exports.logo = logo;
exports.contact = contact;
exports.membres = membres;