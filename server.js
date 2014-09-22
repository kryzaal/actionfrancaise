global.server = "localhost";
global.port = 8080;
global.isDevelopment = true;
global.document_root = __dirname;
global.nullOrEmpty = function(value) { return '' + value == "undefined"; }

var express = require("express");
var compression = require('compression');
var favicon = require('serve-favicon');
var ejs = require('ejs');
var bodyParser = require('body-parser')
var database = require('./database');

database.init();
process.on('exit', database.finalize);

var controllers = {
    index :         require('./controllers/index'),
    contact :       require('./controllers/contact'),
    adherer :       require('./controllers/adherer'),
    dons :          require('./controllers/dons'),
    media :         require('./controllers/media'),
    organigramme :  require('./controllers/organigramme'),
    militez :       require('./controllers/militez'),
    manifeste :     require('./controllers/manifeste'),
    recherche :     require('./controllers/recherche'),
    profils :       require('./controllers/profils'),
    articles :      require('./controllers/articles'),
    rss:            require('./controllers/rss'),
    slideshow:      require('./controllers/slideshow'),
    files:          require('./controllers/files'),
    entites:        require('./controllers/entites'),
    style:          require('./controllers/style')
};

var app = express();

app.use(favicon(__dirname + '/static/style/images/favicon.png'))
.use(compression())
.use(bodyParser.json())
.use(bodyParser.urlencoded())
.use(require('morgan')('dev'));

/** ROUTES **/

app.get("/", controllers.index.get);

app.get("/contact", controllers.contact.get);
app.get("/contact/:who", controllers.contact.get);
app.post("/contact", controllers.contact.post);
app.post("/contact/:who", controllers.contact.post);

app.get("/adherer", controllers.adherer.get);
app.post("/adherer", controllers.adherer.post);
app.get("/adherer/bulletin", controllers.files.adhesion);

app.get("/dons", controllers.dons.get);
app.post("/dons", controllers.dons.post);

app.get("/media", controllers.media.get);
app.get("/media/visuels", controllers.media.visuels.list);
app.get("/media/visuels/random", controllers.media.visuels.random);
app.use("/media/visuels/:filename", controllers.media.visuels.get);
app.get("/media/videos", controllers.media.videos.list);

app.get("/entites/craf", controllers.entites.craf.get);
app.get("/entites/craf/logo", controllers.entites.craf.logo);
app.get("/entites/craf/contact", controllers.entites.craf.contact);
app.get("/entites/craf/membres", controllers.entites.craf.membres);

app.get("/entites/sections", controllers.entites.sections.list);
app.get("/entites/sections/:code", controllers.entites.sections.get);
app.get("/entites/sections/:code/blason", controllers.entites.sections.blason);
app.get("/entites/sections/:code/contact", controllers.entites.sections.contact);
app.get("/entites/sections/:code/membres", controllers.entites.sections.membres);

app.get("/entites/sections/:code/af", controllers.entites.sections.af.get);
app.get("/entites/sections/:code/af/membres", controllers.entites.sections.af.membres);
app.get("/entites/sections/:code/af/contact", controllers.entites.sections.af.contact);
app.get("/entites/sections/:code/af/blason", controllers.entites.sections.af.blason);

app.get("/entites/sections/:code/afe", controllers.entites.sections.afe.get);
app.get("/entites/sections/:code/afe/membres", controllers.entites.sections.afe.membres);
app.get("/entites/sections/:code/afe/contact", controllers.entites.sections.afe.contact);
app.get("/entites/sections/:code/afe/blason", controllers.entites.sections.afe.blason);

app.get("/entites/federations", controllers.entites.federations.list);
app.get("/entites/federations/:code", controllers.entites.federations.get);
app.get("/entites/federations/:code/sections", controllers.entites.federations.sections);
app.get("/entites/federations/:code/membres", controllers.entites.federations.membres);
app.get("/entites/federations/:code/contact", controllers.entites.federations.contact);
app.get("/entites/federations/:code/blason", controllers.entites.federations.blason);

app.get("/manifeste", controllers.manifeste.get);
app.post("/recherche", controllers.recherche.post);
app.get("/carte", controllers.militez.carte.get);

app.get("/creer", controllers.militez.creer.get);
app.post("/creer", controllers.militez.creer.post);
app.get("/militez/creer", controllers.militez.creer.get);
app.post("/militez/creer", controllers.militez.creer.post);

app.get("/actions", controllers.militez.actions.latest);
app.get("/actions/:action", controllers.militez.actions.get);
app.get("/actions/:action/affiche", controllers.militez.actions.affiche);
app.get("/actions/:action/photos", controllers.militez.actions.photos);
app.get("/actions/:action/:photo", controllers.militez.actions.photo);

app.get("/militez", controllers.militez.get);
app.get("/militez/militer", controllers.militez.militer.get);
app.get("/militez/carte", controllers.militez.carte.get);
app.get("/militez/cmrds", controllers.militez.cmrds.get);
app.get("/militez/creer", controllers.militez.creer.get);

app.get("/militez/actions", controllers.militez.actions.latest);
app.get("/militez/actions/:action", controllers.militez.actions.get);
app.get("/militez/actions/:action/affiche", controllers.militez.actions.affiche);
app.get("/militez/actions/:action/photos", controllers.militez.actions.photos);
app.get("/militez/actions/:action/:photo", controllers.militez.actions.photo);

app.get("/militez/camelots", controllers.militez.camelots.get);
app.get("/militez/camelots/photos", controllers.militez.camelots.photos);
app.get("/militez/camelots/photos/:code", controllers.militez.camelots.photo);
app.get("/militez/camelots/videos", controllers.militez.camelots.videos);
app.get("/militez/camelots/chants", controllers.militez.camelots.chants);
app.get("/militez/camelots/chants/:code", controllers.militez.camelots.chant);
app.get("/militez/camelots/chants/:code/vignette", controllers.militez.camelots.vignettes.chants);
app.get("/militez/camelots/textes", controllers.militez.camelots.textes);
app.get("/militez/camelots/textes/:code", controllers.militez.camelots.texte);
app.get("/militez/camelots/textes/:code/vignette", controllers.militez.camelots.vignettes.textes);

app.get("/militez/textes", controllers.militez.textes.get);
app.post("/militez/textes", controllers.militez.textes.list);
app.post("/militez/textes/:query", controllers.militez.textes.filter);
app.get("/militez/textes/:code", controllers.militez.texte.get);

app.get("/organigramme", controllers.organigramme.get);
app.get("/organigramme/craf", controllers.organigramme.craf.get);
app.get("/organigramme/journal", controllers.organigramme.journal.get);

app.get("/rss", controllers.rss.get);
app.get("/rss/xml", controllers.rss.xml);

app.get("/profils/:code/photo", controllers.profils.photo);
app.get("/profils/:code/widget", controllers.profils.widget);
app.get("/profils/:code/textes", controllers.profils.textes);
app.get("/profils/:code/roles", controllers.profils.roles);
app.get("/profils/:code", controllers.profils.get);

app.get("/articles/:code", controllers.articles.get);
app.get("/articles/:code/resume", controllers.articles.resume);
app.get("/articles/:code/image", controllers.articles.image);
app.post("/articles", controllers.articles.list);
app.post("/articles/:query", controllers.articles.search);

app.get("/slideshow", controllers.slideshow.get);
app.get("/slideshow/:filename", controllers.slideshow.slide);
app.get("/jquery", controllers.files.jquery);
app.get("/paypal", controllers.files.paypal);

app.use("/style/images/:filename", controllers.style.image);
app.use("/style/:filename", controllers.style.css);

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
    err = JSON.stringify(err);

    console.log(err);
    response.status(500);
    if(pretty) response.render('500.ejs', {erreur : err});
    else response.end(err);
}

global.send501 = function(response, pretty) {
    if(typeof(pretty) === 'undefined') pretty = false;

    response.status(501);
    if(pretty) response.render('501.ejs');
    else response.end();
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

app.listen(port);