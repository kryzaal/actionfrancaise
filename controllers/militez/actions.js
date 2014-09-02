var fs = require('fs');
var model = require('../../models/action');
var folder = require(document_root + "/lib/folder");

var actionsFolder = new folder.Folder(document_root + '/data/actions/');
var subfolders = {};

function get(request, response) {
    var action_specifiee = true;
    if(!request.params.action) {
        request.params.action = 'jeanne_2014';
        action_specifiee = false;
    }

    model.fetchOne(request.params.action, function(err, data) {
        if(err) throw err;
        if(!data) send404(response, true);
        else {
            response.render('militez_actions.ejs', {
                pageSubtitle: action_specifiee ? makeTitre(data) : "Campagnes et évenements",
                customStylesheets: ["militez_actions", "militez_tuiles", "viewer"],
                action: data
            });
        }
    });
}

function photos(request, response) {
    if(typeof(subfolders[request.params.action]) === 'undefined') subfolders[request.params.action] = actionsFolder.subfolder(request.params.action);
    subfolders[request.params.action].lsToJson(response);
}

function photo(request, response) {
    if(typeof(subfolders[request.params.action]) === 'undefined') subfolders[request.params.action] = actionsFolder.subfolder(request.params.action);
    subfolders[request.params.action].fileToBinary(response, request.params.photo + '.jpg', 'image/jpg');
}

function affiche(request, response) {
    actionsFolder.fileToBinary(response, request.params.action + '.jpg', 'image/jpg');
}

function makeTitre(data) {
    var titre = data.nom;
    if(data.edition && data.edition.actuelle) titre += " - " + data.edition.actuelle;
    return titre;
}

exports.get = get;
exports.photo = photo;
exports.photos = photo;
exports.affiche = affiche;
