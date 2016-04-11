var mailer = require('nodemailer');
var smtp = require('nodemailer-smtp-transport');

var transporter = mailer.createTransport(smtp({
    host: global.smtp_server,
    port: global.smtp_port
}));

function send(mailOptions, callback) {
    transporter.sendMail(mailOptions, function(error){
        if(error) {
            console.log("Mail sent " + JSON.stringify(mailOptions));
            callback(null);
        }
        else {
            console.log("Sendmail error : " + error);
            callback(error);
        }
    });
}

exports.send = send;