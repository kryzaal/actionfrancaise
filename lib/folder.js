var fs = require("fs");

function Folder(folder) {
	this.folder = folder;
	this.useCache = !isDevelopment;
	this.cache = [];

	this.subfolder = function(name) {
		return new Folder(this.folder + '/' + name);
	}

	this.defaultErrorCallback = function(error, response) {
		if(error.code == "ENOENT") send404();
		else send500();
	}

	//function error(error, response);
	this.lsToJson = function(response, error) {
		if(typeof(error)==='undefined') error = this.defaultErrorCallback;

		var readdirCallback = function(err, files) {
			if (err) error(err, response);
			else {
				response.writeHead('200', {'Content-Type': 'application/json'});
		    	response.end(JSON.stringify(files));
		    }
	    }

		if(this.useCache) readdirCallback(false, this.cache);
		else fs.readdir(this.folder, readdirCallback);
	}

	//function error(error, response);
	this.fileToBinary = function(response, filename, mimeType, error) {
		if(typeof(error)==='undefined') error = this.defaultErrorCallback;

		fs.readFile(this.folder + '/' + filename, function (err, data) {
	        if (err) error(err, response);
	    	else {
	    		response.writeHead('200', {'Content-Type': mimeType});
	        	response.end(data, 'binary');
	    	}
		});
	}

	//function error(error, response);
	this.randomFilenameToPlain = function(response, error) {
		if(typeof(error)==='undefined') error = this.defaultErrorCallback;

		var readdirCallback = function(err, files) {
			if (err) error(err, response);
			else {
				var random = files[Math.floor(Math.random() * files.length)];
				response.writeHead('200', {'Content-Type': 'text/plain'});
		        response.end(random);
			}
	    }
		
		if(this.useCache) readdirCallback(false, this.cache);
		else fs.readdir(this.folder, readdirCallback);
	}

	//Lancé dans tous les cas, au moins pour vérifier la validité du dossier.
	try {
		this.cache = fs.readdirSync(this.folder);
	} catch(err) {
		console.log(err);
	}
}

exports.Folder = Folder;