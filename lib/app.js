
var path      = require("path"),
	_         = require("underscore"),
	GitStatus = require("./git/status"),
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
		var gitStatus = new GitStatus(this.getFullPath());
		gitStatus.exec();
		gitStatus.on("exec", _.bind(this.onGitStatus, this));
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
	
	onGitStatus: function(isGitRepo)
	{
		isGitRepo ? this.run() : this.notGitRepo();
	},
	
	run: function()
	{
		console.log("run");
	}
};

module.exports = App;

