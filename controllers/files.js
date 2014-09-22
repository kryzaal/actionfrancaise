var folder = require(document_root + "/lib/folder");
var filesFolder = new folder.Folder(document_root + '/static/files/');

function jquery(request, response) {
    filesFolder.fileToBinary(response, "jquery.min.js", 'application/javascript');
}

function adhesion(request, response) {
	filesFolder.fileToBinary(response, "bulletin_adhesion.pdf", 'application/pdf');
}

function paypal(request, response) {
	filesFolder.fileToBinary(response, "paypal-button.min.js", 'application/javascript');
}

exports.jquery = jquery;
exports.adhesion = adhesion;
exports.paypal = paypal;