var mail = require(document_root + '/controllers/mail');

function get(request, response) {
    response.render('adherer.ejs', {
        pageSubtitle: "Adhérer",
        customStylesheets: ["formulaire"],
        captcha: { publicKey : require('./captcha').publicKey }
    });
}

function post(request, response) {
    captcha.check(request, function(err, ok) {
        if(ok) {
            var mailOptions = {
                from: 'Action Française <kryzaal@gmail.com>',
                to: request.body.email,
                subject: 'Confirmation de votre inscription',
                text: 'Inscription confirmée ' + request.body.prenom + ' ' + request.body.nom,
                html: '<b>Inscription confirmée</b>' + request.body.prenom + ' ' + request.body.nom
            };

            mail.send(mailOptions, function(error, info){
                if(error){
                    console.log(error);
                }

                renderView(response, {
                    color: error ? 'red' : 'green',
                    duration: 5,
                    html: error ? 'Inscription échouée' : 'Inscription réussie'
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

exports.get = get;
exports.post = post;