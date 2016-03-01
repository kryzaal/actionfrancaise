exports.json = function(response) {
	this.response = response;

	this.send = function(err, data) {
		send(err, data, response);
	};

	send = function(err, data, response) {
		if(err) send500(response, false, err);
		else {
			response.writeHead('200', {'Content-Type': 'application/json'});
			response.end(JSON.stringify(data));
		}
	}
};