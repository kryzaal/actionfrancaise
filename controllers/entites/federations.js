var model = require(document_root + '/models/federation');
var folder = require(document_root + '/lib/folder');

var federationsFolder = new folder.Folder(document_root + '/data/entites/federations');
federationsFolder.fallbackFileName = 'fallback.png';

function get(request, response) {
	send501(response, false);
}

function contact(request, response) {
	send501(response, false);
}

function blason(request, response) {
	federationsFolder.fileToBinary(response, request.params.code + '.png', 'image/png');
}

function membres(request, response) {
	send501(response, false);
}

function sections(request, response) {
	send501(response, false);
}

function list(request, response) {
	send501(response, false);
}

exports.get = get;
exports.list = list;
exports.blason = blason;
exports.contact = contact;
exports.membres = membres;
exports.sections = sections;