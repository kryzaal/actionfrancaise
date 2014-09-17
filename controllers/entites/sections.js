var model = require(document_root + '/models/section');
var folder = require(document_root + '/lib/folder');

var sectionsFolder = new folder.Folder(document_root + '/data/entites/sections');
sectionsFolder.fallbackFileName = 'fallback.png';

function get(request, response) {
	send501(response, false);
}

function contact(request, response) {
	send501(response, false);
}

function blason(request, response) {
	sectionsFolder.fileToBinary(response, request.params.code + '.png', 'image/png');
}

function membres(request, response) {
	send501(response, false);
}

function federation(request, response) {
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
exports.federation = federation;

exports.af = require('./sections/af');
exports.afe = require('./sections/afe');