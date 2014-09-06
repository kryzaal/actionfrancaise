var folder = require(document_root + '/lib/folder.js');

function get(request, response) {
	new folder.Folder(document_root + "/data/slideshow").lsToJson(response);
}

exports.get = get;