var _transporter = null;

var contacts = {
    default: "Action Française <kryzaal@gmail.com>",
    bordeaux: "AFE Bordeaux <kryzaal@gmail.com>"
}

function setTransporter(transporter) {
	_transporter = transporter;
}

function get(request, response) {
    response.render('contact.ejs', {
        pageSubtitle: "Contact",
        customStylesheets: ["formulaire"],
        who: typeof request.params.who === undefined ? "default" : request.params.who
    });
}

function post(request, response) {
    var who = typeof request.params.who === undefined ? "default" : request.params.who;

	var mailOptions = {
        from: request.body.email,
        to: contacts[who],
        subject: 'Message de ' + request.body.prenom + ' ' + request.body.nom,
        text: request.body.message
    };

    _transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }

        response.render('contact.ejs', {
            pageSubtitle: "Contact",
            customStylesheets: ["formulaire"],
            toaster: {
                color: error ? 'red' : 'green',
                duration: 5,
                html: error ? 'Votre message n\'a pas été envoyé' : 'Merci pour votre message, nous y répondrons dans les meilleurs délais !'
            },
            who: who
        });
    });
}

exports.get = get;
exports.post = post;
exports.setTransporter = setTransporter;