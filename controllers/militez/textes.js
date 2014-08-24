var textes = [
]

function get(request, response) {
	response.render('militez_textes.ejs', {
    	pageSubtitle: "Grands textes",
    	customStylesheets: ["militez_textes.css", "militez_tuiles.css"]
    });
}

function post(request, response) {
	response.status(200).write("<texte></texte>").end();
}

exports.get = get;
exports.post = post;