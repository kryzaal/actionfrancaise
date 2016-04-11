var mail = require(document_root + '/lib/mail');
var captcha = require(document_root + '/lib/captcha');
var jsonLib = require(document_root + '/lib/json');
var async = require('async');

function get(request, response) {
    do_get(request, response, 'contact.ejs');
}

function get_form(request, response) {
    do_get(request, response, 'contact_form.ejs');
}

function do_get(request, response, template) {
    if(!request.params.who) request.params.who = "contact";
    if(!request.query.custom_header) request.query.custom_header = "Contactez-nous";
    if(global.isDevelopment) request.query.custom_header
        = request.query.custom_header
        + " " + request.params.who
        + "@contact.actionfrancaise.net";

    response.render(template, {
        pageSubtitle: request.query.custom_header,
        customStylesheets: ["formulaire"],
        captcha: { publicKey : global.recaptcha.publicKey },
        values: {
            mail: request.body.mail,
            prenom: request.body.prenom,
            nom: request.body.nom,
            message: request.body.message
        },
        who: request.params.who
    });
}

function post(request, response) {
    if(!request.params.who) request.params.who = "contact";

    var sender = new jsonLib.json(response);

    var mailOptions = {
        from: request.body.mail,
        to: request.params.who + "@contact.actionfrancaise.net",
        subject: 'Message de ' + request.body.prenom + ' ' + request.body.nom,
        text: request.body.message
    };

    async.series([
        function(callback) {
            captcha.check(request, callback);
        },
        function(callback) {
            mail.send(mailOptions, callback);
        }
    ], function (e) {
        if(e) {
            sender.send(e, null);
        } else sender.send(false, "ok");
    });
}

exports.get = get;
exports.post = post;
exports.get_form = get_form;