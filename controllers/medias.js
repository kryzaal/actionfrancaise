var fs = require("fs");

function get(request, response) {
	var fileNames = fs.readdir(document_root + "/data/visuels", function(err, files) {
        response.render('medias.ejs', {
	    	pageSubtitle: "Visuels, affiches et vidéos",
	    	customStylesheets: ["medias", "viewer"],
	    	visuels: files,
	    	videos: ["1rC2plTGGBU", "5W-IIoqQHKs", "1jPOX72PPMw", "io3Yk1IGyaA", "e5WxM2qjpBo", "c7lxeFrHh9M", "Gf8oIxqaHRs"]
    	})
    });
}

exports.get = get;