var fs = require('fs');
var model = require('../../models/action');

function get(request, response) {
    var action_specifiee = true;
    if(!request.params.action) {
        request.params.action = 'jeanne_2014';
        action_specifiee = false;
    }

    model.fetchOne(request.params.action, function(err, data) {
        if(err) throw err;
        if(!data) do404(response);
        else fs.readdir(document_root + "/data/actions/" + request.params.action, function(err, files) {
            if(err) files = null;
                
            data.photos = files;

            response.render('militez_campagnes.ejs', {
                pageSubtitle: action_specifiee ? makeTitre(data) : "Campagnes et évenements",
                customStylesheets: ["militez_actions", "militez_tuiles", "viewer"],
                action: data
            });
        });
    });
}

function photo(request, response) {
    model.exists(request.params.action, function(err, exists) {
        if(err) throw err;
        if(exists)
            fs.readFile(document_root + '/data/actions/' + request.params.action + '/' + request.params.photo + '.jpg', function (error, data) {
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
    model.exists(request.params.action, function(err, exists) {
        if(err) throw err;
        if(exists)
            fs.readFile(document_root + '/data/actions/' + request.params.action + '.jpg', function (error, data) {
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
