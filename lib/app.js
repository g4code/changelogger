
var path      = require("path"),
	_         = require("underscore"),
	GitStatus = require("./git/status"),
	GitLog	  = require("./git/log"),
	args      = [];

function App() {
	
};

App.prototype = {
		
	fullPath: null,
	
	setArgs: function(programArgs)
	{
		args = programArgs;
		
		return this;
	},
	
	init: function()
	{
		var gitStatus = new GitStatus();
    	gitStatus.setRepoPath(this.getFullPath())
		 		 .exec()
		 		 .on("exec", _.bind(this.onGitStatus, this));
	},
	
	getFullPath: function()
	{
		if(this.fullPath === null) {
			this.fullPath = path.resolve(args.shift() || "./");
		}
		
		return this.fullPath;
	},
	
	notGitRepo: function()
	{
		console.log(this.getFullPath() + " is not a git repo.");
	},
	
	onGitLog: function(log)
	{
		console.log(log);
	},
	
	onGitStatus: function(isGitRepo)
	{
		isGitRepo ? this.run() : this.notGitRepo();
	},
	
	run: function()
	{
		var gitLog = new GitLog(this.getFullPath());
		gitLog.exec();
		gitLog.on("exec", _.bind(this.onGitLog, this));
	}
};

module.exports = App;

