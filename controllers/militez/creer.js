var mail_form = require(document_root + '/lib/mail_form');
var parent = new mail_form.mail_form('militez_creer.ejs', "Créer une section", 'Merci pour votre message, nous y répondrons dans les meilleurs délais !');

function post(request, response) {
    var mailOptions = {
        from: request.body.email,
        to: 'kryzaal@gmail.com',
        subject: 'Demande de création de section par ' + request.body.prenom + ' ' + request.body.nom,
        text: request.body.message
    };

    parent.post(request, response, mailOptions);
}

exports.get = parent.get;
exports.post = post;