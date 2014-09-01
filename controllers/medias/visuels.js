var fs = require("fs");
var folder = require(document_root + "/lib/folder");

var visuelsFolder = new folder.Folder(document_root + '/data/visuels/');

function get(request, response) {
    visuelsFolder.fileToBinary(response, request.params.filename, 'image');
}

function list(request, response) {
	visuelsFolder.lsToJson(response);
}

function random(request, response) {
    visuelsFolder.randomFilenameToPlain(response);
}

exports.list = list;
exports.get = get;
exports.random = random;