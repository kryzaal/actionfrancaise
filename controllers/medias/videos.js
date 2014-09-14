var model = require(document_root + '/models/video');

function list(request, response) {
	model.fetchCodes('videos', function(err, data) {
		if(err) send500(response, false, err);
		response.writeHead('200', {'Content-Type': 'application/json'});
		response.end(JSON.stringify(data));
	});
}

exports.list = list;