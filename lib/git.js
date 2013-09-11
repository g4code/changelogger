
var exec   = require('child_process').exec,
	events = require('events'),
	util   = require("util"),
	_ 	   = require('underscore');

function Git() {

};

util.inherits(Git, events.EventEmitter);

module.exports = Git;

Git.prototype.repoPath = null;
	
Git.prototype.doExec = function(command) {
	
	exec("cd " + this.repoPath + " && " + command, _.bind(this.onExecCallback, this));
};
	
Git.prototype.onExecCallback = function(error, stdout, stderr) {

	console.log(error, stdout, stderr);
};
	
Git.prototype.setRepoPath = function(repoPath) {
	
	this.repoPath = repoPath;
		
	return this;
};