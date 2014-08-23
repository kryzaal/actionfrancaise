function get(request, response) {
	response.render('militez.ejs', {
    	pageSubtitle: "Militez !",
    	customStylesheets: ["militez.css", "militez_tuiles.css"]
    });
}

exports.get = get;
exports.militer = require('./militez/militer');
exports.campagnes = require('./militez/campagnes');
exports.carte = require('./militez/carte');
exports.camelots = require('./militez/camelots');
exports.cmrds = require('./militez/cmrds');
exports.textes = require('./militez/textes');
exports.creer = require('./militez/creer');