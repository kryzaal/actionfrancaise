var folder = require(document_root + '/lib/folder.js');
var cssFolder = new folder.Folder(document_root + "/static/style");
var imagesFolder = cssFolder.subfolder('images');

function css(request, response) {
	cssFolder.fileToBinary(response, request.params.filename, 'text/css');
}

function image(request, response) {
	imagesFolder.fileToBinary(response, request.params.filename, 'image');
}

exports.css = css;
exports.image = image;