var fs = require("fs");

function get(request, response) {
    response.render('medias.ejs', {
    	pageSubtitle: "Visuels, affiches et vidéos",
    	customStylesheets: ["medias", "viewer"]
	});
}

exports.get = get;
exports.visuels = require('./medias/visuels');
exports.videos = require('./medias/videos');