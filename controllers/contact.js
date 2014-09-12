var mail_form = require(document_root + '/lib/mail_form');

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

function getContactInfos(who) {
    if(nullOrEmpty(who)) return contacts['default'];

    var data = contacts[who];
    return nullOrEmpty(data) ? contacts['default'] : data;
}

function get(request, response) {
    var contact_parent = new mail_form.mail_form('contact.ejs', getContactInfos().titre, 'Merci pour votre message, nous y répondrons dans les meilleurs délais !');
    contact_parent.get(request, response);
}

function post(request, response) {
    var who = 'default';
    if(typeof request.params.who != 'undefined') who = request.params.who;

    var mailOptions = {
        from: request.body.email,
        to: contacts[who].mail,
        subject: 'Message de ' + request.body.prenom + ' ' + request.body.nom,
        text: request.body.message
    };

    var contact_parent = new mail_form.mail_form('contact.ejs', contacts[who].titre, 'Merci pour votre message, nous y répondrons dans les meilleurs délais !');
    contact_parent.post(request, response);
}

exports.get = get;
exports.post = post;