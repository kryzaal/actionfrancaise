var folder = require(document_root + "/lib/folder");

var filesFolder = new folder.Folder(document_root + '/static/files/');

function jquery(request, response) {
    filesFolder.fileToBinary(response, "jquery.min.js", 'application/javascript');
}

function adhesion(request, response) {
	filesFolder.fileToBinary(response, "bulletin_adhesion.pdf", 'application/pdf');
}

exports.jquery = jquery;
exports.adhesion = adhesion;