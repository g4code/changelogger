
var GitStatus = require("./git/status");

function Git() {

};

module.exports = Git;

Git.prototype =
{
    fullPath: "",

    setFullPath: function(fullPath)
    {
        this.fullPath = fullPath;

        return this;
    },

    status: function(callback)
    {
        var gitStatus = new GitStatus();
        gitStatus.setRepoPath(this.fullPath)
                 .exec()
                 .on("exec", callback);
    }
}