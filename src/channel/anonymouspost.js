var ChannelModule = require("./module");
var Flags = require("../flags");

function AnonymousPost(_channel) {
    ChannelModule.apply(this, arguments);
}

AnonymousPost.prototype = Object.create(ChannelModule.prototype);

AnonymousPost.prototype.onUserPreJoin = function (user, data, cb) {
    const opts = this.channel.modules.options;
    var anonymousPosting =  opts.get("allow_anon_chat");
    user.guestLogin("Anonymous");

    cb(null, ChannelModule.PASSTHROUGH);
   
};

module.exports = AnonymousPost;
