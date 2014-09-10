var captcha = require(document_root + '/controllers/captcha');
var mail = require(document_root + '/controllers/mail');

function get(request, response) {
    response.render('dons.ejs', {
        pageSubtitle: "Dons",
        customStylesheets: ["formulaire"],
        captcha: { publicKey : require('./captcha').publicKey }
    })
}

function post(request, response) {
    captcha.check(request, function(err, ok) {
        if(ok) {
            var mailOptions = {
                from: 'Action Française <kryzaal@gmail.com>',
                to: request.body.email,
                subject: 'Merci pour votre don',
                text: 'Merci pour votre don',
                html: 'Merci pour votre don'
            };

            mail.send(mailOptions, function(error, info){
                if(error){
                    console.log(error);
                }

                renderView(response, {
                    color: error ? 'red' : 'green',
                    duration: 5,
                    html: error ? 'Votre don n\'a pas été envoyé' : 'Merci pour votre don, Vive le Roi !'
                });
            });
        } else {
            renderView(response, {
                color: 'red',
                duration: 5,
                html: 'Vérification du captcha échouée'
            });
        }
    });
}

function renderView(response, toaster) {
    if(typeof(toaster) == 'undefined') toaster = false;

    response.render('dons.ejs', {
        pageSubtitle: "Dons",
        customStylesheets: ["formulaire"],
        toaster : toaster,
        captcha: { publicKey : captcha.publicKey }
    });
}

exports.get = get;
exports.post = post;