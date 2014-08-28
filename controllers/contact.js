var _transporter = null;
var captcha = require('./captcha');

var contacts = {
    'default': {
        code: "default",
        mail: "Action Française <kryzaal@gmail.com>",
        titre: "Contactez-nous",
    },
    'bordeaux': {
        code: "bordeaux",
        mail: "AFE Bordeaux <kryzaal@gmail.com>",
        titre: "Contactez l'AFE Bordeaux",
    }
}

function setTransporter(transporter) {
	_transporter = transporter;
}

function get(request, response) {
    var who = typeof request.params.who == 'undefined' ? "default" : request.params.who;

    response.render('contact.ejs', {
        pageSubtitle: "Contact",
        customStylesheets: ["formulaire"],
        who: contacts[who],
        captcha: { publicKey : require('./captcha').publicKey }
    });
}

function post(request, response) {
    if(!captcha.check(request)) throw "Bad captcha";

    var who = typeof request.params.who == 'undefined' ? "default" : request.params.who;

	var mailOptions = {
        from: request.body.email,
        to: contacts[who],
        subject: 'Message de ' + request.body.prenom + ' ' + request.body.nom,
        text: request.body.message
    };

    _transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }

        response.render('contact.ejs', {
            pageSubtitle: "Contact",
            customStylesheets: ["formulaire"],
            toaster: {
                color: error ? 'red' : 'green',
                duration: 5,
                html: error ? 'Votre message n\'a pas été envoyé' : 'Merci pour votre message, nous y répondrons dans les meilleurs délais !'
            },
            who: contacts[who]
        });
    });
}

exports.get = get;
exports.post = post;
exports.setTransporter = setTransporter;