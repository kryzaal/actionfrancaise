var mailer = require('nodemailer');
var smtp = require('nodemailer-smtp-transport');

var transporter = mailer.createTransport(smtp({
    host: 'localhost',
    port: 25
}));

function send(mailOptions, callback) {
    transporter.sendMail(mailOptions, function(error){
        callback(error);
    });
}

exports.send = send;