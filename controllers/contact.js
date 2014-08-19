var _transporter = null;

function setTransporter(transporter) {
	_transporter = transporter;
}

function get(request, response) {
    response.render('contact.ejs', {
        pageSubtitle: "Contact",
        customStylesheets: ["formulaire.css"]
    });
}

function post(request, response) {
	var mailOptions = {
        from: request.body.email,
        to: 'Action Française <kryzaal@gmail.com>',
        subject: 'Message de ' + request.body.prenom + ' ' + request.body.nom,
        text: request.body.message
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }

        response.render('contact.ejs', {
            pageSubtitle: "Contact",
            customStylesheets: ["contact.css"],
            toaster: {
                color: error ? 'red' : 'green',
                duration: 5,
                html: error ? 'Votre message n\'a pas été envoyé' : 'Merci pour votre message, nous y répondrons dans les meilleurs délais !'
            }
        });
    });
}

exports.get = get;
exports.post = post;
exports.setTransporter = setTransporter;