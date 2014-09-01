var fs = require("fs");

function get(request, response) {
	fs.readFile(document_root + '/data/visuels/' + request.params.filename, function (err, data) {
        if (err) 
        	fs.readFile(document_root + '/data/visuels/fallback.png', function (err, data) {
		        if (err) throw err;

		        response.writeHead('307', {'Content-Type': 'image/png'});
		        response.end(data, 'binary');
		    });
    	else {
    		response.writeHead('200', {'Content-Type': 'image'});
        	response.end(data,'binary');
    	}
    });
}

function list(request, response) {
	var fileNames = fs.readdir(document_root + "/data/visuels", function(err, files) {
		response.writeHead('200', {'Content-Type': 'application/json'});
    	response.end(JSON.stringify(files));
    });
}

function random(request, response) {
    fs.readdir(document_root + "/data/visuels", function(err, files) {
        var random = files[Math.floor(Math.random() * files.length)];
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end(random);
    });
}

exports.list = list;
exports.get = get;
exports.random = random;