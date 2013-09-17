
var util  = require("util"),
    Super = require("./super");

function Tag() {

};

module.exports = Tag;

util.inherits(Tag, Super);

Tag.prototype.exec = function() {

    return this.doExec("git show-ref --tags");
};

Tag.prototype.onExecCallback = function(error, stdout, stderr) {

    this.emit("exec", stdout);
};
