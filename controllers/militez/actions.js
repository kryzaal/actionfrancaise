var fs = require('fs');
var model = require(document_root + '/models/action');
var folder = require(document_root + "/lib/folder");
var json = require(document_root + "/lib/json");

var actionsFolder = new folder.Folder(document_root + '/data/actions/');
var subfolders = {};

function get(request, response) {
    model.fetchOne(request.params.action, function(err, data) {
        displayAction(request, response, err, data, makeTitre(data));
    });
}

function photos(request, response) {
    if(typeof(subfolders[request.params.action]) === 'undefined') 
        subfolders[request.params.action] = actionsFolder.subfolder(request.params.action);
    subfolders[request.params.action].lsToJson(response);
}

function photo(request, response) {
    if(typeof(subfolders[request.params.action]) === 'undefined')
        subfolders[request.params.action] = actionsFolder.subfolder(request.params.action);
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

function latest(request, response) {
    model.fetchLatest(function(err, data) {
        displayAction(request, response, err, data, "Campagnes et évenements");
    });
}

function displayAction(request, response, err, data, titre) {
    if(request.accepts('html')) {
        if(err) send500(response, true, err);
        else if(!data) send404(response, true);
        else {
            response.render('militez_actions.ejs', {
                pageSubtitle: titre,
                customStylesheets: ["militez_actions", "militez_tuiles", "viewer"],
                action: data
            });
        }
    } else {
        var sender = new json.json(response);
        sender.send(err, data);
    }
}

exports.get = get;
exports.photo = photo;
exports.photos = photos;
exports.affiche = affiche;
exports.latest = latest;
