
var GitStatus = require("./git/status"),
    GitLog    = require("./git/log"),
    GitTag    = require("./git/tag"),
    _         = require("underscore");

function Git() {

};

module.exports = Git;

Git.prototype =
{
    commits: [],

    repoPath: "",

    tags: [],

    init: function()
    {
        this.status();
    },

    log: function()
    {
        var gitLog = new GitLog();
        gitLog.setRepoPath(this.repoPath)
              .exec()
              .on("exec", _.bind(this.onLog, this));
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
        this.commits = commits;

        _.keys(this.commits).length > 0 ? console.log(this.commits) : this.noCommits();
    },

    onStatus: function(isGitRepo)
    {
        isGitRepo ? this.tag() : this.notGitRepo();
    },

    onTag: function(tags)
    {
        this.tags = tags;

        this.log();
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
                 .on("exec", _.bind(this.onStatus, this));
    },

    tag: function(callback)
    {
        var gitTag = new GitTag();
        gitTag.setRepoPath(this.repoPath)
              .exec()
              .on("exec", _.bind(this.onTag, this));
    }
};