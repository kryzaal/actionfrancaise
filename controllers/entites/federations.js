var model = require(document_root + '/models/federation');
var folder = require(document_root + '/lib/folder');
var jsonLib = require(document_root + '/lib/json');
var existsOr404 = require(document_root + '/lib/existsOr404');

var federationsFolder = new folder.Folder(document_root + '/data/entites/federations', 'fallback.png');

function get(request, response) {
	existsOr404.call(request, response, 'code', model, function() {
		model.fetchOne(request.params.code, function(err, data) {
			if(request.accepts('html')) {
				response.render('entites_federation.ejs', {
			        pageSubtitle: data.nom,
			        customStylesheets: ["entites_federation"],
			        section: data
		    	});
			} else {
				var sender = new jsonLib.json(response);
				sender.send(err, data);
			}
		});
	});
}

function contact(request, response) {
	existsOr404.call(request, response, 'code', model, function() {
		model.fetchContact(request.params.code, function(err, data) {
			var sender = new jsonLib.json(response);
			sender.send(err, data);
		});
	});
}

function blason(request, response) {
	federationsFolder.fileToBinary(response, request.params.code + '.png', 'image/png');
}

function membres(request, response) {
	existsOr404.call(request, response, 'code', model, function() {
		model.fetchMembres(request.params.code, function(err, data) {
			var sender = new jsonLib.json(response);
			sender.send(err, data);
		});
	});
}

function sections(request, response) {
	existsOr404.call(request, response, 'code', model, function() {
		model.fetchSections(request.params.code, function(err, data) {
			var sender = new jsonLib.json(response);
			sender.send(err, data);
		});
	});
}

function list(request, response) {
	model.fetchAll(function(err, data) {
		var sender = new jsonLib.json(response);
		sender.send(err, data);
	});
}

exports.get = get;
exports.list = list;
exports.blason = blason;
exports.contact = contact;
exports.membres = membres;
exports.sections = sections;