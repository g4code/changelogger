
var util = require("util"),
    Git  = require("../git");

function Status() {

};

module.exports = Status;

util.inherits(Status, Git);

Status.prototype.exec = function() {

    return this.doExec("git status");
};

Status.prototype.onExecCallback = function(error, stdout, stderr) {

    this.emit("exec", stdout.length > 0 && stderr.length === 0);
};