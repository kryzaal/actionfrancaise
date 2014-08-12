var fs = require("fs");
var express = require("express");
var compression = require('compression');
var favicon = require('serve-favicon');
var ejs = require('ejs');

var app = express();

app.use(favicon(__dirname + '/static/images/favicon.png'))
.use(compression())
.use(express.static(__dirname + "/static"))

/** ROUTES **/

.get("/", function(request, response){
    response.render('index.ejs', {
    	pageSubtitle: "Accueil",
    	customStylesheets: ["index.css"]
    })
})

.get("/adherer", function(request, response){
    response.render('adherer.ejs', {
    	pageSubtitle: "Adhérer",
    	customStylesheets: ["adherer.css"]
    })
})

.get("/organigramme", function(request, response){
    response.render('organigramme.ejs', {
    	pageSubtitle: "Organigramme",
    	customStylesheets: ["organigramme.css"]
    })
})

.get("/militez", function(request, response){
    response.render('militez.ejs', {
    	pageSubtitle: "Militez !",
    	customStylesheets: ["militez.css"]
    })
})

.get("/contact", function(request, response){
    response.render('contact.ejs', {
    	pageSubtitle: "Contact",
    	customStylesheets: ["contact.css"]
    })
})

.get("/dons", function(request, response){
    response.render('dons.ejs', {
    	pageSubtitle: "Dons",
    	customStylesheets: ["dons.css"]
    })
})

.get("/medias", function(request, response){
    response.render('medias.ejs', {
    	pageSubtitle: "Médias",
    	customStylesheets: ["medias.css"]
    })
})

.get("/manifeste", function(request, response){
    response.render('manifeste.ejs', {
    	pageSubtitle: "Manifeste",
    	customStylesheets: ["manifeste.css"]
    })
})

/** 404 **/

.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.send('Page introuvable !').status(404).end();
})

.listen(80, "127.0.0.1");