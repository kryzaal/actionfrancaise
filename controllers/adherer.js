var _transporter = null;

function setTransporter(transporter) {
	_transporter = transporter;
}

function get(request, response) {
    response.render('adherer.ejs', {
        pageSubtitle: "Adhérer",
        customStylesheets: ["formulaire"]
    });
}

function post(request, response) {
	var mailOptions = {
        from: 'Action Française <kryzaal@gmail.com>',
        to: request.body.email,
        subject: 'Confirmation de votre inscription',
        text: 'Inscription confirmée ' + request.body.prenom + ' ' + request.body.nom,
        html: '<b>Inscription confirmée</b>' + request.body.prenom + ' ' + request.body.nom
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }

        response.render('adherer.ejs', {
            pageSubtitle: "Adhérer",
            customStylesheets: ["formulaire"],
            toaster: {
                color: error ? 'red' : 'green',
                duration: 5,
                html: error ? 'Inscription échouée' : 'Inscription réussie'
            }
        })
    });
}

exports.get = get;
exports.post = post;
exports.setTransporter = setTransporter;