var mail_form = require(document_root + '/lib/mail_form');
var dons_parent = new mail_form.mail_form('dons.ejs', "Dons", 'Merci pour votre don, Vive le Roi !');

function post(request, response) {
    var mailOptions = {
        from: 'Action Française <kryzaal@gmail.com>',
        to: request.body.email,
        subject: 'Merci pour votre don',
        text: 'Merci pour votre don',
        html: 'Merci pour votre don'
    };

    dons_parent.post(request, response, mailOptions);
}

exports.get = dons_parent.get;
exports.post = post;