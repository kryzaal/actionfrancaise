function get(request, response) {
	response.render('militez.ejs', {
    	pageSubtitle: "Militez !",
    	customStylesheets: ["militez", "militez_tuiles"]
    });
}

exports.get = get;
exports.militer = require('./militez/militer');
exports.actions = require('./militez/actions');
exports.carte = require('./militez/carte');
exports.camelots = require('./militez/camelots');
exports.cmrds = require('./militez/cmrds');
exports.texte = require('./militez/texte');
exports.textes = require('./militez/textes');
exports.creer = require('./militez/creer');