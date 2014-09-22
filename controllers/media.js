function get(request, response) {
    response.render('media.ejs', {
    	pageSubtitle: "Visuels, affiches et vidéos",
    	customStylesheets: ["media", "viewer"]
	});
}

exports.get = get;
exports.visuels = require('./media/visuels');
exports.videos = require('./media/videos');