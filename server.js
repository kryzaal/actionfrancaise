global.server = "localhost";
global.port = 8080;
global.isDevelopment = true;
global.document_root = __dirname;

var express = require("express");
var compression = require('compression');
var favicon = require('serve-favicon');
var ejs = require('ejs');
var mailer = require('nodemailer');
var bodyParser = require('body-parser')

require('./database');

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
    rss: require('./controllers/rss'),
    sections: require('./controllers/sections')
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
app.get("/medias/videos", controllers.medias.videos.list);

app.get("/sections", controllers.sections.get);
app.get("/sections/:code/contact", controllers.sections.contact);
app.get("/sections/:code/blason", controllers.sections.blason);

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

global.send404 = function(response, pretty) {
    if(typeof(pretty) === 'undefined') pretty = false;

    response.status(404);
    if(pretty) response.render('404.ejs');
    else response.end();
}

global.send500 = function(response, pretty, err) {
    if(typeof(pretty) === 'undefined') pretty = false;
    if(typeof(err) === 'undefined') err = '';

    response.status(500);
    if(pretty) response.render('500.ejs', {erreur : err});
    else response.end(err);
}

app.get("/418", function(request, response) {
    response.status(418).end("I'm not a teapot");
});

app.use(function(request, response, next){
    global.send404(response, true);
});

app.use(function(err, request, response, next) {
    global.send500(response, true, err);
});

app.listen(port, server);