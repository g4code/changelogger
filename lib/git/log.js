
var exec         = require('child_process').exec,
	EventEmitter = require('events').EventEmitter,
	_ 		 	 = require('underscore'),
	fullPath 	 = "./";

function Log(path) {
	
	fullPath = path;
};

Log.prototype = {
	
	exec: function()
	{
		exec("cd " + fullPath + ' && git log --date=iso --pretty=format:"%h %H %an %ad %s"', _.bind(this.onExecCallback, this));
	},
	
	getFullPath: function()
	{
		return fullPath;
	},
	
	onExecCallback: function(error, stdout, stderr) 
	{
		this.emit("exec", stdout);
	}
};

Log.prototype.__proto__ = EventEmitter.prototype;

module.exports = Log;