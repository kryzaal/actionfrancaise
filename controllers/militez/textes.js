var textes = [
]

function get(request, response) {
	response.render('militez_textes.ejs', {
    	pageSubtitle: "Grands textes",
    	customStylesheets: ["militez_textes", "militez_tuiles"]
    });
}

function post(request, response) {
	response.status(200).write("<texte></texte>").end();
}

exports.get = get;
exports.post = post;