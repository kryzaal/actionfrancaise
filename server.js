var server = "127.0.0.1";
var port = 8080;

var fs = require("fs");
var express = require("express");
var compression = require('compression');
var favicon = require('serve-favicon');
var ejs = require('ejs');
var mailer = require('nodemailer');
var bodyParser = require('body-parser')

var placeholder = 'TEXTE';

var controllers = {
    index : require('./controllers/index'),
    contact : require('./controllers/contact'),
    adherer : require('./controllers/adherer'),
    dons : require('./controllers/dons'),
    medias : require('./controllers/medias'),
    organigramme : require('./controllers/organigramme'),
    militez : require('./controllers/militez'),
    manifeste : require('./controllers/manifeste'),
    recherche : require('./controllers/recherche'),
    reseaux_sociaux : require('./controllers/reseaux_sociaux'),
    articles : require('./controllers/articles'),
    carte : require('./controllers/carte')
};

var transporter = mailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'kryzaal',
        pass: ''
    }
});

var app = express();

app.use(favicon(__dirname + '/static/images/favicon.png'))
.use(compression())
.use(bodyParser.json())
.use(bodyParser.urlencoded())
.use(express.static(__dirname + "/static"));

/** ROUTES **/

app.get("/", controllers.index.get);

controllers.contact.setTransporter(transporter);
app.get("/contact", controllers.contact.get);
app.post("/contact", controllers.contact.post);

controllers.adherer.setTransporter(transporter);
app.get("/adherer", controllers.adherer.get);
app.post("/adherer", controllers.adherer.post);

controllers.dons.setTransporter(transporter);
app.get("/dons", controllers.dons.get);
app.post("/dons", controllers.dons.post);

app.get("/medias", controllers.medias.get);
app.get("/organigramme", controllers.organigramme.get);
app.get("/militez", controllers.militez.get);
app.get("/manifeste", controllers.manifeste.get);
app.get("/carte", controllers.carte.get);
app.post("/recherche", controllers.recherche.post);

app.get("/facebook", controllers.reseaux_sociaux.facebook);
app.get("/twitter", controllers.reseaux_sociaux.twitter);
app.get("/youtube", controllers.reseaux_sociaux.youtube);

app.get("/article/:id", controllers.articles.get);

app.get("/visuel/random", function(request, response) {
    var fileNames = fs.readdir(__dirname + "/visuels", function(err, files) {
        var random = files[Math.floor(Math.random() * files.length)];
        response.redirect("/visuel/" + random);
    });
});

app.use("/visuel", express.static(__dirname + "/visuels"));

/** 404 & 500 **/

app.use(function(req, res, next){
    res.status(404).render('404.ejs');
});

app.use(function(err, req, res, next) {
    res.status(500).render('500.ejs', {erreur : err});
});

app.listen(port, server);
