var fs = require("fs");

function get(request, response) {
	var fileNames = fs.readdir(__dirname + "/../visuels", function(err, files) {
        response.render('medias.ejs', {
	    	pageSubtitle: "Médias",
	    	customStylesheets: ["medias"],
	    	visuels: files,
	    	videos: ["1rC2plTGGBU", "1rC2plTGGBU", "5W-IIoqQHKs", "1jPOX72PPMw", "io3Yk1IGyaA", "e5WxM2qjpBo", "c7lxeFrHh9M", "Gf8oIxqaHRs", "1rC2plTGGBU"]
    	})
    });
}

exports.get = get;