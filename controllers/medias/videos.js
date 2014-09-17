var model = require(document_root + '/models/video');
var json = require(document_root + '/lib/json');

function list(request, response) {
	var sender = new json.json(response);
	model.fetchCodes('videos', sender.send);
}

exports.list = list;