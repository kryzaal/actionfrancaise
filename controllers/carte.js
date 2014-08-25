var parent = require('./militez/carte.js');

function get(request, response) {
	response.render('militez_carte.ejs', {
    	pageSubtitle: "L'AF près de chez moi",
    	customStylesheets: ["militez_carte", "militez_tuiles"],
    	tuiles: false,
    	sections: parent.sections
    });
}

exports.get = get;