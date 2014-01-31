
var _         = require("underscore"),
    evento    = require("evento"),
    GitStatus = require("../git/status"),
    GitTag    = require("../git/tag"),
    GitLog    = require("../git/log");

function Git() {

};

Git.prototype = {

    request: null,

    response: {
        commits: {},
        tags:    []
    },


    findTags: function()
    {
        this.tag = new GitTag();
        this.tag.setRepoPath(this.request.repository)
                .exec()
                .on("exec", _.bind(this.onTag, this));
    },

    notGitRepo: function()
    {
        evento.trigger("error", this.request.repository+" is not a git repo.");
    },

    onLog: function(commits)
    {
        this.response.commits = commits;
        evento.trigger("info", "Commits: "+_.size(this.response.commits));
        evento.trigger("git", this.response);
    },

    onStatus: function(isGitRepo)
    {
        isGitRepo ? this.findTags() : this.notGitRepo();
    },

    onTag: function(tags)
    {
        this.response.tags = tags;

        evento.trigger("info", "Tags: "+_.size(this.response.tags));

        this.log = new GitLog();
        this.log.setRepoPath(this.request.repository)
                .exec()
                .on("exec", _.bind(this.onLog, this));
    },

    start: function()
    {
        evento.trigger("loading", "Git logs");
        this.status = new GitStatus();
        this.status.setRepoPath(this.request.repository)
                   .exec()
                   .on("exec", _.bind(this.onStatus, this));
    }
};

module.exports = new Git();