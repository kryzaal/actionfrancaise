var mail_form = require(document_root + '/lib/mail_form');
var remerciements = 'Merci pour votre message, nous y répondrons dans les meilleurs délais !';

function get(request, response) {
    do_get(request, response, 'contact.ejs');
}

function get_form(request, response) {
    do_get(request, response, 'contact_form.ejs');
}

function do_get(request, response, template) {
    if(!request.params.who) request.params.who = "contact";
    if(!request.query.custom_header) request.query.custom_header = "Contactez-nous";

    var contact_parent = new mail_form.mail_form(template, request.query.custom_header, remerciements);
    contact_parent.get(request, response);
}

function post(request, response) {
    do_post(request, response, 'contact.ejs');
}

function post_form(request, response) {
    do_post(request, response, 'contact_form.ejs');
}

function do_post(request, response, template) {
    if(!request.params.who) request.params.who = "contact";
    if(!request.query.custom_header) request.query.custom_header = "Contactez-nous";

    var mailOptions = {
        from: request.body.email,
        to: request.params.who + "@contact.actionfrancaise.net",
        subject: 'Message de ' + request.body.prenom + ' ' + request.body.nom,
        text: request.body.message
    };

    var contact_parent = new mail_form.mail_form(template, request.query.custom_header, remerciements);
    contact_parent.post(request, response, mailOptions);
}

exports.get = get;
exports.post = post;
exports.get_form = get_form;
exports.post_form = post_form;