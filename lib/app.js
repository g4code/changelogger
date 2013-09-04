
var path      = require("path"),
	_         = require("underscore"),
	GitStatus = require("./git/status"),
	args      = [];

function App() {
	
};

App.prototype = {
	
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
		return path.resolve(args.shift() || "./");
	},
	
	onGitStatus: function(isGitRepo)
	{
		console.log(isGitRepo);
	}
};

module.exports = App;

