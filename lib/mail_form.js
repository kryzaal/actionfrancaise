var mail = require(document_root + '/lib/mail');
var captcha = require(document_root + '/lib/captcha');

function mail_form(pageTemplate, pageSubtitle, successMsg) {
    this.pageSubtitle = pageSubtitle;

    var renderSuccess = function(response, pageSubtitle) {
        renderView(response, {
            color: 'green',
            duration: 5,
            html: errMsg
        }, false, pageSubtitle);
    }

    var renderError = function(response, error, request, pageSubtitle) {
        renderView(response, {
            color: 'red',
            duration: 5,
            html: error
        }, request.body, pageSubtitle);
    }

    var renderView = function(response, toaster, values, pageSubtitle) {
        response.render(pageTemplate, {
            pageSubtitle: pageSubtitle,
            customStylesheets: ["formulaire"],
            toaster : toaster,
            captcha: { publicKey : captcha.publicKey },
            valueIfPresent: function(name) {
                if(nullOrEmpty(values) || nullOrEmpty(values[name])) return '';
                else return values[name];
            },
            values: values
        });
    }

    this.get = function(request, response) {
        renderView(response, false, request, this.pageSubtitle);
    }

    this.post = function(request, response, mailOptions) {
        captcha.check(request, function(err, ok) {
            if(ok) {
                mail.send(mailOptions, function(error, info){
                    if(error){
                        console.log(error);
                        renderError(response, 'Envoi du message échoué. Réessayez ultérieurement.', request, this.pageSubtitle);
                    } else renderSuccess(response, this.pageSubtitle);
                });
            } else renderError(response, 'Vous n\'avez pas renseigné la bonne réponse au captcha', request, this.pageSubtitle);
        });
    }
}

exports.mail_form = mail_form;