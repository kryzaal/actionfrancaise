var model = require(document_root + '/models/afe');
var folder = require(document_root + '/lib/folder');
var jsonLib = require(document_root + '/lib/json');
var existsOr404 = require(document_root + '/lib/existsOr404');

var afeFolder = new folder.Folder(document_root + '/data/entites/sections/afe');
afeFolder.fallbackFileName = 'fallback.png';

function get(request, response) {
	existsOr404(request, response, 'code', model, function() {
		model.fetchOne(request.params.code, function(err, data) {
			var sender = new jsonLib.json(response);
			sender.send(err, data);
		});
	});
}

function contact(request, response) {
	existsOr404(request, response, 'code', model, function() {
		model.fetchContact(request.params.code, function(err, data) {
			var sender = new jsonLib.json(response);
			sender.send(err, data);
		});
	});
}

function blason(request, response) {
	afeFolder.fileToBinary(response, request.params.code + '.png', 'image/png');
}

function membres(request, response) {
	existsOr404(request, response, 'code', model, function() {
		model.fetchMembres(request.params.code, function(err, data) {
			var sender = new jsonLib.json(response);
			sender.send(err, data);
		});
	});
}

exports.get = get;
exports.blason = blason;
exports.contact = contact;
exports.membres = membres;