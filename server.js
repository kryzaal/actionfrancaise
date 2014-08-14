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

var articles_demo = [
	{id: 1, date: '23/05/2014', heure: '12:34', titre: 'CMRDS 2014',  sous_titre: 'Moment de camaraderie et de formation', 
    resume: '<b>Vive le Roi</b>', complet: '', image: 'image_article2.jpg'},

	{id: 2, date: '24/05/2014', heure: '16:52', titre: 'Les identitaires rejoignent l\'AF', sous_titre: 'Le royalisme, seule conclusion possible au nationalisme.', 
    resume: 'A mort la république !', complet: '', image: 'image_article1.jpg'},

	{id: 3, date: '23/05/2014', heure: '12:34', titre: 'CMRDS 2014', 
	sous_titre: 'Moment de camaraderie et de formation', resume: '<b>Vive le Roi</b>', complet: '', image: 'image_article2.jpg'},

	{id: 4, date: '24/05/2014', heure: '16:52', titre: 'Les identitaires rejoignent l\'AF', 
	sous_titre: 'Le royalisme, seule conclusion possible au nationalisme.', resume: 'A mort la république !', complet: '', image: 'image_article1.jpg'},

	{id: 5, date: '23/05/2014', heure: '12:34', titre: 'CMRDS 2014', 
	sous_titre: 'Moment de camaraderie et de formation', resume: '<b>Vive le Roi</b>', complet: '', image: 'image_article2.jpg'},

	{id: 6, date: '24/05/2014', heure: '16:52', titre: 'Les identitaires rejoignent l\'AF', 
	sous_titre: 'Le royalisme, seule conclusion possible au nationalisme.', resume: 'A mort la république !', complet: '', image: 'image_article1.jpg'},

	{id: 7, date: '23/05/2014', heure: '12:34', titre: 'CMRDS 2014', 
	sous_titre: 'Moment de camaraderie et de formation', resume: '<b>Vive le Roi</b>', complet: '', image: 'image_article2.jpg'},

	{id: 8, date: '24/05/2014', heure: '16:52', titre: 'Les identitaires rejoignent l\'AF', 
	sous_titre: 'Le royalisme, seule conclusion possible au nationalisme.', resume: 'A mort la république !', complet: '', image: 'image_article1.jpg'},
]; 

var controllers = {
    contact : require('./controllers/contact')
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
.use(express.static(__dirname + "/static"))

/** ROUTES **/

.get("/", function(request, response){
    response.render('index.ejs', {
    	pageSubtitle: "Accueil",
    	customStylesheets: ["index.css"],
    	articles : articles_demo
    })
});

controllers.contact.setTransporter(transporter);
app.get("/contact", controllers.contact.get);
app.post("/contact", controllers.contact.post);

app.get("/article/:id", function(request, response){
    response.render('article.ejs', {
        pageSubtitle: "",
        customStylesheets: ["article.css"],
        article: articles_demo[request.params.id],
        uri: 'http://' + server + ':' + port + '/article/' + request.params.id
    })
})

.get("/adherer", function(request, response){
    response.render('adherer.ejs', {
    	pageSubtitle: "Adhérer",
    	customStylesheets: ["adherer.css"]
    })
})

.post("/adherer", function(request, response){

    var mailOptions = {
        from: 'Action Française <kryzaal@gmail.com>',
        to: request.body.email,
        subject: 'Confirmation de votre inscription',
        text: 'Inscription confirmée ' + request.body.prenom + ' ' + request.body.nom,
        html: '<b>Inscription confirmée</b>' + request.body.prenom + ' ' + request.body.nom
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }

        response.render('adherer.ejs', {
            pageSubtitle: "Adhérer",
            customStylesheets: ["adherer.css"],
            toaster: {
                color: error ? 'red' : 'green',
                duration: 5,
                html: error ? 'Inscription échouée' : 'Inscription réussie'
            }
        })
    });
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

.get("/dons", function(request, response){
    response.render('dons.ejs', {
    	pageSubtitle: "Dons",
    	customStylesheets: ["dons.css"]
    })
})

.post("/dons", function(request, response){
    var mailOptions = {
        from: 'Action Française <kryzaal@gmail.com>',
        to: request.body.email,
        subject: 'Merci pour votre don',
        text: 'Merci pour votre don',
        html: 'Merci pour votre don'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }

        response.render('dons.ejs', {
            pageSubtitle: "Dons",
            customStylesheets: ["dons.css"],
            toaster: {
                color: error ? 'red' : 'green',
                duration: 5,
                html: error ? 'Votre don n\'a pas été envoyé' : 'Merci pour votre don, vive le Roi !'
            }
        })
    });
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
    });
})

.post("/recherche", function(request, response){
    response.render('recherche.ejs', {
        pageSubtitle: "Recherche" + "",
        customStylesheets: ["recherche.css"]
    });
})

.get("/facebook", function(request, response) {
    response.redirect("https://facebook.com/action.francaise.nationale")
})

.get("/twitter", function(request, response) {
    response.redirect("https://twitter.com/actionfrancaise")
})

.get("/youtube", function(request, response) {
    response.redirect("https://youtube.com/channel/UCgYqaZrPyWNEIEKOESjc8IA")
})

.get("/visuel/random", function(request, response) {
    var fileNames = fs.readdir(__dirname + "/visuels", function(err, files) {
        var random = files[Math.floor(Math.random() * files.length)];
        response.redirect("/visuel/" + random);
    });
})

.use("/visuel", express.static(__dirname + "/visuels"))

/** 404 & 500 **/

.use(function(req, res, next){
    res.status(404).render('404.ejs');
})

.use(function(err, req, res, next) {
    res.status(500).render('500.ejs', {erreur : err});
})

.listen(port, server);
