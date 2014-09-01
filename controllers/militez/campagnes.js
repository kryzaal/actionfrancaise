var fs = require('fs');
var model = require('../../models/campagne');

function get(request, response) {
    var campagne_specifiee = true;
    if(!request.params.campagne) {
        request.params.campagne = 'jeanne_2014';
        campagne_specifiee = false;
    }

    model.fetchOne(request.params.campagne, function(err, data) {
        if(err) throw err;
        if(!data) do404(response);
        else fs.readdir(document_root + "/data/campagnes/" + request.params.campagne, function(err, files) {
            if(err) files = null;
                
            data.photos = files;

            response.render('militez_campagnes.ejs', {
                pageSubtitle: campagne_specifiee ? makeTitre(data) : "Campagnes et évenements",
                customStylesheets: ["militez_campagnes", "militez_tuiles", "viewer"],
                campagne: data
            });
        });
    });
}

function photo(request, response) {
    model.exists(request.params.campagne, function(err, exists) {
        if(err) throw err;
        if(exists)
            fs.readFile(document_root + '/data/campagnes/' + request.params.campagne + '/' + request.params.photo + '.jpg', function (error, data) {
                if (error) do404(response);
                else {
                    response.writeHead('200', {'Content-Type': 'image/jpg'});
                    response.end(data,'binary');
                }
            });
        else do404(response);
    });
}

function affiche(request, response) {
    model.exists(request.params.campagne, function(err, exists) {
        if(err) throw err;
        if(exists)
            fs.readFile(document_root + '/data/campagnes/' + request.params.campagne + '.jpg', function (error, data) {
                if (error) do404(response);
                else {
                    response.writeHead('200', {'Content-Type': 'image/jpg'});
                    response.end(data,'binary');
                }
            });
        else do404(response);
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
exports.affiche = affiche;
