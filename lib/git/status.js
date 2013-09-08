
var exec         = require('child_process').exec,
	EventEmitter = require('events').EventEmitter,
	_ 		 	 = require('underscore'),
	fullPath 	 = "./";

function Status(path) {
	
	fullPath = path;
};

Status.prototype = {
	
	exec: function()
	{
		exec("cd " + fullPath + " && git status", _.bind(this.onExecCallback, this));
	},
	
	getFullPath: function()
	{
		return fullPath;
	},
	
	onExecCallback: function(error, stdout, stderr) 
	{
		this.emit("exec", stdout.length > 0 && stderr.length === 0);
	}
};

Status.prototype.__proto__ = EventEmitter.prototype;

module.exports = Status;