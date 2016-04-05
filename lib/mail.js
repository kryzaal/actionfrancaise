var mailer = require('nodemailer');
var smtp = require('nodemailer-smtp-transport');

var transporter = mailer.createTransport(smtp({
    host: global.smtp_server,
    port: global.smtp_port
}));

function send(mailOptions, callback) {
    transporter.sendMail(mailOptions, function(error){
        callback(error);
    });
}

exports.send = send;