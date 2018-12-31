"use strict";

var ChannelModule = require("./module");
var Flags = require("../flags");

function makeIPHash(ip) {
	var numeric = 0;
	for(var i = 0 ; i < ip.length ; i++){
		if(ip.charAt(i) != '.'){
			numeric += ip.charAt(i);
		}
	}
	numeric = parseInt(numeric); 	
	return  makeID((numeric * 13) % 1000000);
}

function makeID(id_number){
	var id_string = "" + id_number;
	var processed_string = "";
	for(var i = 0 ; i < id_string.length ; i += 2){
		var num = id_string.charAt(i)
		if(i + 1 < id_string.length) num += id_string.charAt(i + 1);
		num = parseInt(num) % 61;
		processed_string += convertNumToIDChar("" + num);
	}
	return processed_string;
}

function convertNumToIDChar(num){
	switch(num){
		case "0": return 'a';
		case "1": return 'b';
		case "2": return 'c';
		case "3": return 'd';
		case "4": return 'e';
		case "5": return 'f';
		case "6": return 'g';
		case "7": return 'h';
		case "8": return 'i';
		case "9": return 'j';
		case "10": return 'k';
		case "11": return 'l';
		case "12": return 'm';
		case "13": return 'n';
		case "14": return 'o';
		case "15": return 'p';
		case "16": return 'q';
		case "17": return 'r';
		case "18": return 's';
		case "19": return 't';
		case "20": return 'u';
		case "21": return 'v';
		case "22": return 'w';
		case "23": return 'x';
		case "24": return 'y';
		case "25": return 'z';
		case "26": return 'A';
		case "27": return 'B';
		case "28": return 'C';
		case "29": return 'D';
		case "30": return 'E';
		case "31": return 'F';
		case "32": return 'G';
		case "33": return 'H';
		case "34": return 'I';
		case "35": return 'J';
		case "36": return 'K';
		case "37": return 'L';
		case "38": return 'M';
		case "39": return 'N';
		case "40": return 'O';
		case "41": return 'P';
		case "42": return 'Q';
		case "43": return 'R';
		case "44": return 'S';
		case "45": return 'T';
		case "46": return 'U';
		case "47": return 'V';
		case "48": return 'W';
		case "49": return 'X';
		case "50": return 'Y';
		case "51": return 'Z';
		case "52": return '1';
		case "53": return '2';
		case "54": return '3';
		case "55": return '4';
		case "56": return '5';
		case "57": return '6';
		case "58": return '7';
		case "59": return '8';
		case "60": return '9';
		case "61": return '0';

	}
	console.log('notret');
}

function AnonymousPost(_channel) {
    ChannelModule.apply(this, arguments);
}

AnonymousPost.prototype = Object.create(ChannelModule.prototype);

AnonymousPost.prototype.onUserPreJoin = function (user, data, cb) {
    const opts = this.channel.modules.options;
    var anonymousPosting = opts.get("allow_anon_chat");
	if(anonymousPosting && user.isAnonymous){
		user.guestLogin("Anonymous-" + makeIPHash(user.realip) +"");
		//user.guestLogin("Anonymous");
		cb(null, ChannelModule.PASSTHROUGH);
	}
	else{
		cb(null, ChannelModule.PASSTHROUGH);
	}
}; 

module.exports = AnonymousPost;
//# sourceMappingURL=anonymouspost.js.map