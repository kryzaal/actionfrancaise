var folder = require(document_root + '/lib/folder.js');
var slideFolder = new folder.Folder(document_root + "/data/slideshow");

function get(request, response) {
	slideFolder.lsToJson(response);
}

function slide(request, response) {
	slideFolder.fileToBinary(response, request.params.filename, 'image/jpg');
}

exports.get = get;
exports.slide = slide;