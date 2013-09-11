
var util = require("util"),
	Git  = require("../git");

function Status() {

};

module.exports = Status;

util.inherits(Status, Git);

Status.prototype.exec = function() {
	
	this.doExec("git status");
		
	return this;
};
		
Status.prototype.onExecCallback = function(error, stdout, stderr) {

	this.emit("exec", stdout.length > 0 && stderr.length === 0);
};