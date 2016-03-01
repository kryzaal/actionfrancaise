var mailer = require('nodemailer');

var transporter = mailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'kryzaal',
        pass: 'EtaNhaeck'
    }
});

function send(mailOptions, callback) {
    transporter.sendMail(mailOptions, function(error){
        callback(error);
    });
}

exports.send = send;