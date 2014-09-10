var captcha = require(document_root + '/controllers/captcha');
var mail = require(document_root + '/controllers/mail');

function get(request, response) {
	renderView(response);
}

function post(request, response) {
    captcha.check(request, function(err, ok) {
        if(ok) {
            var mailOptions = {
                from: request.body.email,
                to: 'kryzaal@gmail.com',
                subject: 'Demande de création de section par ' + request.body.prenom + ' ' + request.body.nom,
                text: request.body.message
            };

            mail.send(mailOptions, function(error, info){
                if(error){
                    console.log(error);
                }

                renderView(response, {
                    color: error ? 'red' : 'green',
                    duration: 5,
                    html: error ? 'Votre message n\'a pas été envoyé' : 'Merci pour votre message, nous y répondrons dans les meilleurs délais !'
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

    response.render('militez_creer.ejs', {
        pageSubtitle: "Créer une section",
        customStylesheets: ["formulaire"],
        toaster : toaster,
        captcha: { publicKey : captcha.publicKey }
    });
}

exports.get = get;
exports.post = post;