var fs = require("fs");

function Folder(folder, fallbackFileName) {
	this.notfound = false;
	this.folder = folder;
	this.useCache = !isDevelopment;
	this.cache = [];
	this.fallbackFileName = fallbackFileName;

	this.subfolder = function(name) {
		return new Folder(this.folder + '/' + name);
	};

	this.defaultErrorCallback = function(error, response) {
		if(this.notfound) send404(response);
		else if(error.code == "ENOENT") send404(response, false);
		else send500(response, false, error);
	};

	this.lsToJson = function(response, error) {
		if(this.notfound) {
			response.writeHead('200', {'Content-Type': 'application/json'});
	    	response.end(JSON.stringify([]));
		} else {
			if(typeof(error)==='undefined') error = this.defaultErrorCallback;

			var readdirCallback = function(err, files) {
				if (err) error(err, response);
				else {
					if(!files) files = [];
					response.writeHead('200', {'Content-Type': 'application/json'});
			    	response.end(JSON.stringify(files));
			    }
		    };

			if(this.useCache) readdirCallback(false, this.cache);
			else fs.readdir(this.folder, readdirCallback);
		}
	};

	this.fileToBinary = function(response, filename, mimeType, error) {
		var context = this;
		if(context.notfound) {
			send404(response);
			return;
		}

		if(typeof(error)==='undefined') error = context.defaultErrorCallback;
		
		fs.readFile(context.folder + '/' + filename, function (err, data) {
	        if (err) {
				fs.readFile(context.folder + '/' + context.fallbackFileName, function (fberr, fbdata) {
			        if (fberr) error(fberr, response);
			    	else {
			    		response.writeHead('200', {'Content-Type': mimeType});
			        	response.end(fbdata, 'binary');
			    	}
				});
	        }
	    	else {
	    		response.writeHead('200', {'Content-Type': mimeType});
	        	response.end(data, 'binary');
	    	}
		});
	};

	this.randomFilenameToPlain = function(response, error) {
		if(this.notfound) {
			send404(response);
			return;
		}
		if(typeof(error)==='undefined') error = this.defaultErrorCallback;

		var readdirCallback = function(err, files) {
			if (err) error(err, response);
			else {
				var random = files[Math.floor(Math.random() * files.length)];
				response.writeHead('200', {'Content-Type': 'text/plain'});
		        response.end(random);
			}
	    };
		
		if(this.useCache) readdirCallback(false, this.cache);
		else fs.readdir(this.folder, readdirCallback);
	};

	//Lancé dans tous les cas, au moins pour vérifier la validité du dossier.
	try {
		this.cache = fs.readdirSync(this.folder);
	} catch(err) {
		this.notfound = true;
	}
}

exports.Folder = Folder;