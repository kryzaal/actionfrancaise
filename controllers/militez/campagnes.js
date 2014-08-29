var fs = require('fs');
var model = require('../../models/campagne');
var tuiles = true;

function get(request, response) {
    var campagne_specifiee = true;
    if(!request.params.campagne) {
        request.params.campagne = 'jeanne_2014';
        campagne_specifiee = false;
    }

    model.fetchOne(request.params.campagne, function(err, data) {
        if(err) throw err;
        if(!data) do404();
        else response.render('militez_campagnes.ejs', {
            pageSubtitle: campagne_specifiee ? "Campagnes et évenements" : makeTitre(data),
            customStylesheets: ["militez_campagnes", "militez_tuiles", "viewer"],
            tuiles: tuiles,
            campagne: data
        });
    });
}

function photo(request, response) {
    model.exists(request.params.campagne, function(err, exists) {
        if(err) throw err;
        if(exists)
            fs.readFile(document_root + '/static/campagnes/' + request.params.campagne + '/' + request.params.photo + '.jpg', function (error, data) {
                if (error) do404();
                else {
                    response.writeHead('200', {'Content-Type': 'image/jpg'});
                    response.end(data,'binary');
                }
            });
        else do404();
    });
}

function do404(response) {
    response.writeHead('404');
    response.end();
}

function makeTitre(data) {
    var titre = data.nom;
    if(data.edition && data.edition.actuelle) titre += " - " + data.edition.actuelle;
    return titre;
}

exports.get = get;
exports.photo = photo;
exports.tuiles = tuiles;
