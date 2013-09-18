
var GitStatus = require("./git/status"),
    GitLog    = require("./git/log"),
    GitTag    = require("./git/tag"),
    _         = require("underscore");

function Git() {

};

module.exports = Git;

Git.prototype =
{
    /**
     * GitLog object
     */
    log: null,

    /**
     * GitStatus object
     */
    status: null,

    /**
     * GitTag object
     */
    tag: null,

    /**
     * Full path to repository
     */
    repoPath: "",

    init: function()
    {
        this.status();
    },

    log: function()
    {
        this.log = new GitLog();
        this.log.setRepoPath(this.repoPath)
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

        _.keys(this.commits).length > 0 ? null : this.noCommits();
    },

    onStatus: function(isGitRepo)
    {
        isGitRepo ? this.tag() : this.notGitRepo();
    },

    onTag: function()
    {
        console.log(this.tag.tags);

//        this.log();
    },

    setRepoPath: function(repoPath)
    {
        this.repoPath = repoPath;

        return this;
    },

    status: function()
    {
        this.status = new GitStatus();
        this.status.setRepoPath(this.repoPath)
                   .exec()
                   .on("exec", _.bind(this.onStatus, this));
    },

    tag: function()
    {
        this.tag = new GitTag();
        this.tag.setRepoPath(this.repoPath)
                .exec()
                .on("exec", _.bind(this.onTag, this));
    }
};