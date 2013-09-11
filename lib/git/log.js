
var util = require("util"),
    Git  = require("../Git");

function Log() {

};

module.exports = Log;

util.inherits(Log, Git);

Log.prototype.prettyFormat = ["%h", "%H", "%an", "%ad", "%s"];

Log.prototype.exec = function()
{
    return this.doExec('git log --date=iso --pretty=format:"' + this.getPrettyFormat() + '"');
};

Log.prototype.getPrettyFormat = function()
{
    return this.prettyFormat.join(" ");
};

Log.prototype.onExecCallback = function(error, stdout, stderr)
{
    this.emit("exec", stdout);
};