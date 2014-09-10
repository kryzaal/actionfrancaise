var captcha = require('./captcha');
var mail = require(document_root + '/controllers/mail');

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

function get(request, response) {
    var who = 'default';
    if(typeof request.params.who != 'undefined') who = request.params.who;

    renderView(response, who);
}

function post(request, response) {
    var who = 'default';
    if(typeof request.params.who != 'undefined') who = request.params.who;

    captcha.check(request, function(err, ok) {
        if(ok) {
            var mailOptions = {
                from: request.body.email,
                to: contacts[who].mail,
                subject: 'Message de ' + request.body.prenom + ' ' + request.body.nom,
                text: request.body.message
            };

            mail.send(mailOptions, function(error, info){
                if(error){
                    console.log(error);
                }

                renderView(response, who, {
                    color: error ? 'red' : 'green',
                    duration: 5,
                    html: error ? 'Votre message n\'a pas été envoyé' : 'Merci pour votre message, nous y répondrons dans les meilleurs délais !'
                });
            });
        } else {
            renderView(response, who, {
                color: 'red',
                duration: 5,
                html: 'Vérification du captcha échouée'
            });
        }
    });
}

function renderView(response, who, toaster) {
    if(typeof(toaster) == 'undefined') toaster = false;

    response.render('contact.ejs', {
        pageSubtitle: "Contact",
        customStylesheets: ["formulaire"],
        toaster : toaster,
        captcha: { publicKey : captcha.publicKey },
        who: contacts[who]
    });
}

exports.get = get;
exports.post = post;