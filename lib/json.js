exports.json = function(response) {
	this.response = response;

	this.send = function(error, data) {
		send(error, data, response);
	};

	send = function(error, data, response) {
		if(error) send500(response, false, error);
		else {
			response.writeHead('200', {'Content-Type': 'application/json'});
			response.end(JSON.stringify(data));
		}
	}
};