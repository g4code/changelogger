
function Formatter()
{

}

module.exports = Formatter;

Formatter.prototype =
{

    commits: [],

    formatType: '',

    format: function()
    {

    },

    setCommits: function(commits)
    {
        this.commits = commits;

        return this;
    },

    setFormatType: function(formatType)
    {
        this.formatType = formatType;

        return this;
    }
};
