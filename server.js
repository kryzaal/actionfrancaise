var fs = require("fs");
var express = require("express");
var compression = require('compression');
var favicon = require('serve-favicon');
var ejs = require('ejs');
var mailer = require('nodemailer');
var bodyParser = require('body-parser')

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
    	customStylesheets: ["index.css"]
    })
})

.get("/article", function(request, response){
    response.render('article.ejs', {
        pageSubtitle: "",
        customStylesheets: ["article.css"]
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

.get("/contact", function(request, response){
    response.render('contact.ejs', {
    	pageSubtitle: "Contact",
    	customStylesheets: ["contact.css"]
    })
})

.post("/contact", function(request, response){
    var mailOptions = {
        from: request.body.email,
        to: 'Action Française <kryzaal@gmail.com>',
        subject: 'Message de ' + request.body.prenom + ' ' + request.body.nom,
        text: request.body.message
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }

        response.render('contact.ejs', {
            pageSubtitle: "Contact",
            customStylesheets: ["contact.css"],
            toaster: {
                color: error ? 'red' : 'green',
                duration: 5,
                html: error ? 'Votre message n\'a pas été envoyé' : 'Merci pour votre message, nous y répondrons dans les meilleurs délais !'
            }
        })
    });
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

.get("/recherche", function(request, response){
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

/** 404 & 500 **/

.use(function(req, res, next){
    res.status(404).render('404.ejs');
})

.use(function(err, req, res, next) {
    res.status(500).render('500.ejs');
})

.listen(8080, "127.0.0.1");
