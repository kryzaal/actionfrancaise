var parent = require('./militez/campagnes.js');

function get(request, response) {
	response.render('militez_campagnes.ejs', {
    	pageSubtitle: "Campagnes et évenements",
    	customStylesheets: ["militez_campagnes", "militez_tuiles"],
    	tuiles: false
    });
}

exports.get = get;