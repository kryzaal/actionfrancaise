var simple_recaptcha = require('simple-recaptcha');

var publicKey = '6LcNWPkSAAAAAIkvo3QKCFVMM6Y3ghgRt-umaHGv';
var privateKey = '6LcNWPkSAAAAAJNcyx9ecNtE5CaSiMOTXTCZpe2y';

function check(request, callback) {
	var ip = request.ip;
  	var challenge = request.body.recaptcha_challenge_field;
  	var response = request.body.recaptcha_response_field_text + request.body.recaptcha_response_field_audio;
  	
  	simple_recaptcha(privateKey, ip, challenge, response, function(err) {
	    callback(err, err == null);
  	});
}

exports.publicKey = publicKey;
exports.check = check;