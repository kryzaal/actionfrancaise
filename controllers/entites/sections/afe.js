var model = require(document_root + '/models/afe');
var folder = require(document_root + '/lib/folder');
var afeFolder = new folder.Folder(document_root + '/data/entites/sections/afe');
afeFolder.fallbackFileName = 'fallback.png';

function get(request, response) {
	send501(response, false);
}

function contact(request, response) {
	send501(response, false);
}

function blason(request, response) {
	afeFolder.fileToBinary(response, request.params.code + '.png', 'image/png');
}

function membres(request, response) {
	send501(response, false);
}

exports.get = get;
exports.blason = blason;
exports.contact = contact;
exports.membres = membres;