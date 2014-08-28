var captcha = require('recaptcha-async');

var publicKey = '6LcNWPkSAAAAAIkvo3QKCFVMM6Y3ghgRt-umaHGv';
var privateKey = '6LcNWPkSAAAAAJNcyx9ecNtE5CaSiMOTXTCZpe2y';

function newCaptcha() {
	return 

}

function checkCaptcha(request) {
	return recaptcha.checkAnswer(privateKey, 
       req.connection.remoteAddress, 
       req.body.recaptcha_challenge_field, 
       req.body.recaptcha_response_field);
}

exports.publicKey = publicKey;
 