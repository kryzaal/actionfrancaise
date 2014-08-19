var _transporter = null;

function setTransporter(transporter) {
	_transporter = transporter;
}

function get(request, response) {
    response.render('dons.ejs', {
        pageSubtitle: "Dons",
        customStylesheets: ["formulaire.css"]
    })
}

function post(request, response) {
	var mailOptions = {
        from: 'Action Française <kryzaal@gmail.com>',
        to: request.body.email,
        subject: 'Merci pour votre don',
        text: 'Merci pour votre don',
        html: 'Merci pour votre don'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }

        response.render('dons.ejs', {
            pageSubtitle: "Dons",
            customStylesheets: ["dons.css"],
            toaster: {
                color: error ? 'red' : 'green',
                duration: 5,
                html: error ? 'Votre don n\'a pas été envoyé' : 'Merci pour votre don, Vive le Roi !'
            }
        });
    });
}

exports.get = get;
exports.post = post;
exports.setTransporter = setTransporter;