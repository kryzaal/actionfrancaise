var mail_form = require(document_root + '/lib/mail_form');
var adherer_parent = new mail_form.mail_form('adherer.ejs', "Adhérer", 'Inscription réussie');

function post(request, response) {
    var mailOptions = {
        from: 'Action Française <kryzaal@gmail.com>',
        to: request.body.email,
        subject: 'Confirmation de votre inscription',
        text: 'Inscription confirmée ' + request.body.prenom + ' ' + request.body.nom
    };

    adherer_parent.post(request, response, mailOptions);
}

exports.get = adherer_parent.get;
exports.post = post;