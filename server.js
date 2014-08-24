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

var auteur_blanchonnet = {
    nom : "Stéphane Blanchonnet",
    titre : "Président du comité directeur de l'AF",
    photo : "auteur_1.jpg"
}

global.articles_demo = [
	{id: 1, date: '23/05/2014', heure: '12:34', titre: 'CMRDS 2014',  sous_titre: 'Moment de camaraderie et de formation', 
    resume: '<b>       Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</b>', complet: '', image: 'image_article2.jpg', auteur: auteur_blanchonnet},

	{id: 2, date: '24/05/2014', heure: '16:52', titre: 'Les identitaires rejoignent l\'AF', sous_titre: 'Le royalisme, seule conclusion possible au nationalisme.', 
    resume: '<b>       Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</b>', complet: '', image: 'image_article1.jpg', auteur: auteur_blanchonnet},

	{id: 3, date: '23/05/2014', heure: '12:34', titre: 'CMRDS 2014', 
	sous_titre: 'Moment de camaraderie et de formation', resume: '<b>       Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</b>', complet: '', image: 'image_article3.jpg', auteur: auteur_blanchonnet},

	{id: 4, date: '24/05/2014', heure: '16:52', titre: 'Les identitaires rejoignent l\'AF', 
	sous_titre: 'Le royalisme, seule conclusion possible au nationalisme.', resume: '<b> A mort la république !      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</b>', complet: '', image: 'image_article5.jpg', auteur: auteur_blanchonnet},

	{id: 5, date: '23/05/2014', heure: '12:34', titre: 'CMRDS 2014', 
	sous_titre: 'Moment de camaraderie et de formation', resume: '<b>       Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</b>', complet: '', image: 'image_article2.jpg', auteur: auteur_blanchonnet},

	{id: 6, date: '24/05/2014', heure: '16:52', titre: 'Les identitaires rejoignent l\'AF', 
	sous_titre: 'Le royalisme, seule conclusion possible au nationalisme.', resume: '<b>       Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</b>', complet: '', image: 'image_article1.jpg', auteur: auteur_blanchonnet},

	{id: 7, date: '23/05/2014', heure: '12:34', titre: 'CMRDS 2014', 
	sous_titre: 'Moment de camaraderie et de formation', resume: '<b>       Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</b>', complet: '', image: 'image_article3.jpg', auteur: auteur_blanchonnet},

	{id: 8, date: '24/05/2014', heure: '16:52', titre: 'Les identitaires rejoignent l\'AF', 
	sous_titre: 'Le royalisme, seule conclusion possible au nationalisme.', resume: '<b>       Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</b>', complet: '', image: 'image_article1.jpg', auteur: auteur_blanchonnet},
]; 

var controllers = {
    index : require('./controllers/index'),
    contact : require('./controllers/contact'),
    adherer : require('./controllers/adherer'),
    dons : require('./controllers/dons'),
    medias : require('./controllers/medias'),
    organigramme : require('./controllers/organigramme'),
    militez : require('./controllers/militez'),
    manifeste : require('./controllers/manifeste'),
    carte : require('./controllers/carte'),
    recherche : require('./controllers/recherche'),
    reseaux_sociaux : require('./controllers/reseaux_sociaux')
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
app.get("/manifeste", controllers.manifeste.get);
app.post("/recherche", controllers.recherche.post);
app.get("/carte", controllers.carte.get);

app.get("/militez", controllers.militez.get);
app.get("/militez/militer", controllers.militez.militer.get);
app.get("/militez/campagnes", controllers.militez.campagnes.get);
app.get("/militez/carte", controllers.militez.carte.get);
app.get("/militez/camelots", controllers.militez.camelots.get);
app.get("/militez/cmrds", controllers.militez.cmrds.get);
app.get("/militez/creer", controllers.militez.creer.get);

app.get("/militez/textes", controllers.militez.textes.get);
app.post("/militez/textes/:filtre", controllers.militez.textes.post);
app.get("/militez/texte/:id", controllers.militez.texte.get);

app.get("/organigramme", controllers.organigramme.get);
app.get("/organigramme/craf", controllers.organigramme.craf.get);
app.get("/organigramme/journal", controllers.organigramme.journal.get);

app.get("/facebook", controllers.reseaux_sociaux.facebook);
app.get("/twitter", controllers.reseaux_sociaux.twitter);
app.get("/youtube", controllers.reseaux_sociaux.youtube);

app.get("/article/:id", function(request, response){
    response.render('article.ejs', {
        pageSubtitle: articles_demo[request.params.id].titre,
        customStylesheets: ["article.css"],
        article: articles_demo[request.params.id],
        uri: 'http://' + server + ':' + port + '/article/' + request.params.id
    })
})

.get("/visuel/random", function(request, response) {
    var fileNames = fs.readdir(__dirname + "/visuels", function(err, files) {
        var random = files[Math.floor(Math.random() * files.length)];
        response.redirect("/visuel/" + random);
    });
})

.use("/visuel", express.static(__dirname + "/visuels"))

/** 404 & 500 **/

app.use(function(req, res, next){
    res.status(404).render('404.ejs');
});

app.use(function(err, req, res, next) {
    res.status(500).render('500.ejs', {erreur : err});
});

app.listen(port, server);
