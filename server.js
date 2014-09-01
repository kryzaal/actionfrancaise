global.server = "localhost";
global.port = 8080;

var fs = require("fs");
var express = require("express");
var compression = require('compression');
var favicon = require('serve-favicon');
var ejs = require('ejs');
var mailer = require('nodemailer');
var bodyParser = require('body-parser')

global.document_root = __dirname;

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
    profil : require('./controllers/profil'),
    articles : require('./controllers/articles'),
    rss: require('./controllers/rss')
};

var transporter = mailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'kryzaal',
        pass: ''
    }
});

var app = express();

app.use(favicon(__dirname + '/static/style/images/favicon.png'))
.use(compression())
.use(bodyParser.json())
.use(bodyParser.urlencoded())

/** ROUTES **/

app.get("/", controllers.index.get);

controllers.contact.setTransporter(transporter);
app.get("/contact", controllers.contact.get);
app.get("/contact/:who", controllers.contact.get);
app.post("/contact", controllers.contact.post);
app.post("/contact/:who", controllers.contact.post);

controllers.adherer.setTransporter(transporter);
app.get("/adherer", controllers.adherer.get);
app.post("/adherer", controllers.adherer.post);

controllers.dons.setTransporter(transporter);
app.get("/dons", controllers.dons.get);
app.post("/dons", controllers.dons.post);

app.get("/medias", controllers.medias.get);
app.get("/medias/visuels", controllers.medias.visuels.list);
app.get("/medias/visuels/random", controllers.medias.visuels.random);
app.use("/medias/visuels/:filename", controllers.medias.visuels.get);

app.get("/manifeste", controllers.manifeste.get);
app.post("/recherche", controllers.recherche.post);
app.get("/carte", controllers.militez.carte.get);
app.get("/creer", controllers.militez.creer.get);

app.get("/actions", controllers.militez.actions.get);
app.get("/actions/:action", controllers.militez.actions.get);
app.get("/actions/:action/affiche", controllers.militez.actions.affiche);
app.get("/actions/:action/:photo", controllers.militez.actions.photo);

app.get("/militez", controllers.militez.get);
app.get("/militez/militer", controllers.militez.militer.get);
app.get("/militez/carte", controllers.militez.carte.get);
app.get("/militez/camelots", controllers.militez.camelots.get);
app.get("/militez/cmrds", controllers.militez.cmrds.get);
app.get("/militez/creer", controllers.militez.creer.get);

app.get("/militez/actions", controllers.militez.actions.get);
app.get("/militez/actions/:action", controllers.militez.actions.get);
app.get("/militez/actions/:action/affiche", controllers.militez.actions.affiche);
app.get("/militez/actions/:action/:photo", controllers.militez.actions.photo);

app.get("/militez/textes", controllers.militez.textes.get);
app.post("/militez/textes/:filtre", controllers.militez.textes.post);
app.get("/militez/texte/:id", controllers.militez.texte.get);

app.get("/organigramme", controllers.organigramme.get);
app.get("/organigramme/craf", controllers.organigramme.craf.get);
app.get("/organigramme/journal", controllers.organigramme.journal.get);

app.get("/facebook", controllers.reseaux_sociaux.facebook);
app.get("/twitter", controllers.reseaux_sociaux.twitter);
app.get("/youtube", controllers.reseaux_sociaux.youtube);

app.get("/rss", controllers.rss.get);
app.get("/rss/xml", controllers.rss.xml);

app.get("/profil/:code/photo", controllers.profil.photo);
app.get("/profil/:code", controllers.profil.get);

app.get("/article/:code", controllers.articles.get);
app.get("/article/:code/image", controllers.articles.image);

app.use("/files", express.static(__dirname + "/static/files"));
app.use("/style", express.static(__dirname + "/static/style"));
app.use("/fonts", express.static(__dirname + "/static/fonts"));
app.use("/slides", express.static(__dirname + "/data/slideshow"));

/** 404 & 500 **/
app.get("/418", function(request, response) {
    response.status(418).end("I'm not a teapot");
});

app.use(function(req, res, next){
    res.status(404).render('404.ejs');
});

app.use(function(err, req, res, next) {
    res.status(500).render('500.ejs', {erreur : err});
});

app.listen(port, server);
