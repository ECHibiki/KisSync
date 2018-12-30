"use strict";

var ChannelModule = require("./module");
var Flags = require("../flags");

function makeid() {
  var text = "";
  var possible = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  for (var i = 0; i < 3; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function AnonymousPost(_channel) {
    ChannelModule.apply(this, arguments);
}

AnonymousPost.prototype = Object.create(ChannelModule.prototype);

AnonymousPost.prototype.onUserPreJoin = function (user, data, cb) {
    const opts = this.channel.modules.options;
    var anonymousPosting = opts.get("allow_anon_chat");
	if(anonymousPosting && user.isAnonymous){
		user.guestLogin("Anonymous-" + makeid() +"");
		//user.guestLogin("Anonymous");
		cb(null, ChannelModule.PASSTHROUGH);
	}
	else{
		cb(null, ChannelModule.PASSTHROUGH);
	}
};

module.exports = AnonymousPost;
//# sourceMappingURL=anonymouspost.js.map