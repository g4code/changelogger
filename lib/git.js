
var GitStatus = require("./git/status"),
    GitLog    = require("./git/log"),
    _         = require("underscore");

function Git() {

};

module.exports = Git;

Git.prototype =
{
    repoPath: "",

    init: function()
    {
        this.log(_.bind(this.onLog, this));
    },

    log: function(callback)
    {
        var gitLog = new GitLog();
        gitLog.setRepoPath(this.repoPath)
              .exec()
              .on("exec", callback);
    },

    noCommits: function()
    {
        console.log("git repo has no commits.");
    },

    notGitRepo: function()
    {
        console.log(this.repoPath + " is not a git repo.");
    },

    onLog: function(commits)
    {
        console.log(commits);

        commits.length > 0 ? this.tag() : this.noCommits();
    },

    onStatus: function(isGitRepo)
    {
        isGitRepo ? this.log(_) : this.notGitRepo();
    },

    setRepoPath: function(repoPath)
    {
        this.repoPath = repoPath;

        return this;
    },

    status: function(callback)
    {
        var gitStatus = new GitStatus();
        gitStatus.setRepoPath(this.repoPath)
                 .exec()
                 .on("exec", callback);
    },

    tag: function()
    {

    }
}