var fs = require("fs");

function get(request, response) {
    response.render('medias.ejs', {
    	pageSubtitle: "Visuels, affiches et vidéos",
    	customStylesheets: ["medias", "viewer"],
    	videos: ["1rC2plTGGBU", "5W-IIoqQHKs", "1jPOX72PPMw", "io3Yk1IGyaA", "e5WxM2qjpBo", "c7lxeFrHh9M", "Gf8oIxqaHRs"]
	});
}

exports.get = get;
exports.visuels = require('./medias/visuels');