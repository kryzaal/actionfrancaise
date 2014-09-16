var model = require(document_root + '/models/section');
var folder = require(document_root + '/lib/folder');
var sectionsFolder = new folder.Folder(document_root + '/data/entites/sections');

function get(request, response) {
	model.fetchAll(function(err, data) {
		response.writeHead('200', {'Content-Type': 'application/json'});
		response.end(JSON.stringify(data));
	});
}

function contact(request, response) {
	model.exists(request.params.code, function(err, exists) {
		if(exists) response.redirect('/contact/' + request.params.code);
		else {
			response.writeHead("404");
			response.end();
		}
	});
}

function blason(request, response) {
	sectionsFolder.fileToBinary(response, request.params.code + '.png', 'image/png');
}

exports.get = get;
exports.blason = blason;
exports.contact = contact;
exports.af = require('./sections/af');
exports.afe = require('./sections/afe');