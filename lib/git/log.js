
var util  = require("util"),
    _     = require("underscore"),
    Super = require("./super");

function Log() {

};

module.exports = Log;

util.inherits(Log, Super);

Log.prototype.commits = [];

Log.prototype.delimiter = {
    data:   "<#|#>",
    commit: "<#/#>"
};

Log.prototype.rawData = "";

Log.prototype.prettyFormat = {
    abbreviatedHash: "%h",
    hash:            "%H",
    authorName:      "%an",
    authorDate:      "%ad",
    subject:         "%s"
};

Log.prototype.createCommitObjFromRawCommitData = function(rawCommitData)
{
    return _.object(_.keys(this.prettyFormat), rawCommitData.split(this.delimiter.data));
};

Log.prototype.exec = function()
{
    return this.doExec('git log --date=iso --pretty=format:"' + this.getPrettyFormat() + '"');
};

Log.prototype.getPrettyFormat = function()
{
    return _.values(this.prettyFormat).join(this.delimiter.data) + this.delimiter.commit;
};

Log.prototype.onExecCallback = function(error, stdout, stderr)
{
    this.setRawData(stdout)
        .removeNewLines()
        .splitRawDataToCommits()
        .parseCommitData();

    this.emit("exec", this.commits);
};

Log.prototype.parseCommitData = function()
{
    this.commits = _.map(this.commits, _.bind(this.createCommitObjFromRawCommitData, this));
};

Log.prototype.removeNewLines = function()
{
    this.rawData = this.rawData.replace(/\n/g, "");

    return this;
};

Log.prototype.setRawData = function(rawData)
{
    this.rawData = rawData;

    return this;
};

Log.prototype.splitRawDataToCommits = function()
{
    this.commits = this.rawData.split(this.delimiter.commit);

    return this;
};