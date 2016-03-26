var mail_form = require(document_root + '/lib/mail_form');

var contacts = {
    'default': {
        mail: "Action Française <kryzaal@gmail.com>",
        titre: "Contactez-nous"
    },
    'bordeaux': {
        mail: "AFE Bordeaux <kryzaal@gmail.com>",
        titre: "Contactez l'AFE Bordeaux"
    }
};

function getContactInfos(who) {
    if(nullOrEmpty(who)) return contacts['default'];

    var data = contacts[who];
    return nullOrEmpty(data) ? contacts['default'] : data;
}

function get(request, response) {
    do_get(request, response, 'contact.ejs');
}

function get_form(request, response) {
    do_get(request, response, 'contact_form.ejs');
}

function do_get(request, response, template) {
    var contact_parent = new mail_form.mail_form(template, getContactInfos(request.params.who).titre, 'Merci pour votre message, nous y répondrons dans les meilleurs délais !');
    contact_parent.get(request, response);
}

function post(request, response) {
    do_post(request, response, 'contact.ejs');
}

function post_form(request, response) {
    do_post(request, response, 'contact_form.ejs');
}

function do_post(request, response, template) {
    var contact = getContactInfos(request.params.who);

    var mailOptions = {
        from: request.body.email,
        to: contact.mail,
        subject: 'Message de ' + request.body.prenom + ' ' + request.body.nom,
        text: request.body.message
    };

    var contact_parent = new mail_form.mail_form(template, contact.titre, 'Merci pour votre message, nous y répondrons dans les meilleurs délais !');
    contact_parent.post(request, response);
}

exports.get = get;
exports.post = post;
exports.get_form = get_form;
exports.post_form = post_form;