exports.call = function(request, response, key, model, callback) {
	model.exists(request.params[key], function(err, exists) {
		if(err) send500(response, true, err);
		else if(!exists) send404(response, true);
		else callback();
	});
};