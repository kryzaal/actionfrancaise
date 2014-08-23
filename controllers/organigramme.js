function get(request, response) {
	response.render('organigramme.ejs', {
    	pageSubtitle: "Organigramme",
    	customStylesheets: ["organigramme.css"]
    });
}

exports.get = get;
exports.journal = require('./organigramme/journal');
exports.craf = require('./organigramme/craf');
