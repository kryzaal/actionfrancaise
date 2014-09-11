var mail = require(document_root + '/controllers/mail');

function mail_form(pageTemplate, pageSubtitle, successMsg) {
    errMsg = errMsg,;
    successMsg = successMsg;
    pageSubtitle = pageSubtitle;

    this.get = function(request, response) {
        renderView(response, false);
    }

    this.post = function(request, response, mailOptions) {
        captcha.check(request, function(err, ok) {
        if(ok) {
            mail.send(mailOptions, function(error, info){
                if(error){
                    console.log(error);
                    renderError();
                }

                renderView(response, {
                    color: error ? 'red' : 'green',
                    duration: 5,
                    html: error ? 'Inscription échouée' : 'Inscription réussie'
                });
            });
        } else renderError();
    }

    renderSuccess = function(response) {
        renderView(response, {
            color: 'green',
            duration: 5,
            html: errMsg
        });
    }

    renderError = function(response, error) {
        renderView(response, {
            color: 'red',
            duration: 5,
            html: error
        });
    }

    renderView = function(response, toaster) {
        response.render(pageTemplate, {
            pageSubtitle: pageSubtitle,
            customStylesheets: ["formulaire"],
            toaster : toaster,
            captcha: { publicKey : captcha.publicKey }
        });
    }
}

exports.mail_form = mail_form;