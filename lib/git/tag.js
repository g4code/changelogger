
var util  = require("util"),
    Super = require("./super");

function Tag() {

};

module.exports = Tag;

util.inherits(Tag, Super);

Tag.prototype.exec = function() {

    return this.doExec("git tag");
};

Tag.prototype.onExecCallback = function(error, stdout, stderr) {

    this.emit("exec", stdout);
};
