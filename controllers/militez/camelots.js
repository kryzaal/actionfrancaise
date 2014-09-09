var video_model = require(document_root + '/models/video');
var page_model = require(document_root + '/models/page');

var folder = require(document_root + "/lib/folder");

var imagesFolder = new folder.Folder(document_root + '/data/camelots/');
var vignettesTexteFolder = new folder.Folder(document_root + '/data/pages/camelots_textes/');
var vignettesChantFolder = new folder.Folder(document_root + '/data/pages/camelots_chants/');

function get(request, response) {
	response.render('militez_camelots.ejs', {
    	pageSubtitle: "Les Camelots du Roi",
    	customStylesheets: ["militez_camelots", "militez_tuiles"]
    });
}

function photo(request, response) {
	imagesFolder.fileToBinary(response, request.params.code, 'image');
}

function photos(request, response) {
	imagesFolder.lsToJson(response);
}

function videos(request, response) {
	video_model.fetchCodes('camelots', function(err, data) {
		if(err) throw err;
		response.writeHead('200', {'Content-Type': 'application/json'});
		response.end(JSON.stringify(data));
	});
}

function texte(request, response) {
	page_model.fetchOne('camelots_textes', request.params.code, function(err, data) {
		if(err) throw err;
		response.writeHead('200', {'Content-Type': 'application/json'});
		response.end(JSON.stringify(data));
	});
}

function chant(request, response) {
	page_model.fetchOne('camelots_chants', request.params.code, function(err, data) {
		if(err) throw err;
		response.writeHead('200', {'Content-Type': 'application/json'});
		response.end(JSON.stringify(data));
	});
}

function textes(request, response) {
	page_model.fetchList('camelots_textes', function(err, codes) {
		if(err) throw err;
		response.writeHead('200', {'Content-Type': 'application/json'});
		response.end(JSON.stringify(codes));
	});
}

function chants(request, response) {
	page_model.fetchList('camelots_chants', function(err, codes) {
		if(err) throw err;
		response.writeHead('200', {'Content-Type': 'application/json'});
		response.end(JSON.stringify(codes));
	});
}

function vignette_chant(request, response) {
	vignettesChantFolder.fileToBinary(response, request.params.code + '.jpg', 'image');
}

function vignette_texte(request, response) {
	vignettesTexteFolder.fileToBinary(response, request.params.code + '.jpg', 'image');
}

exports.get = get;
exports.photos = photos;
exports.photo = photo;
exports.videos = videos;
exports.textes = textes;
exports.texte = texte;
exports.chants = chants;
exports.chant = chant;
exports.vignettes = { 
	chants : vignette_chant,
	textes : vignette_texte
};