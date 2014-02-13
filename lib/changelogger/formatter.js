
var evento     = require("evento"),
    _          = require("underscore"),
    moment     = require("moment"),
    format     = {
        json: require("../format/json"),
        html: require("../format/html")
    };

function Formatter() {

};

Formatter.prototype = {

    formatter: null,

    request: null,

    response: null,


    addUpcomingTag: function()
    {
        if (_.isUndefined(this.response.commits[0]["tag"])) {
            this.response.commits[0]["tag"] = "upcoming";
            this.response.tags.unshift("upcoming");
        };
    },

    onMap: function(commit)
    {
        commit.date = moment(commit.authorDate).format('MMM D, YYYY');
        commit.tag  = commit.tag.replace(/^\s*\((.+)\)$/, "$1")
                                .replace(/tag:\s/, "")
                                .replace(/^(.+?)(,\s.+)/, "$1");
        if (_.indexOf(this.response.tags, commit.tag) === -1) {
            delete commit.tag;
        }
        return commit;
    },

    formatFactory: function()
    {
        this.formatter = format[this.request.format];
    },

    format: function()
    {
        this.response.commits = _.map(this.response.commits, _.bind(this.onMap, this));

        this.addUpcomingTag();

        this.getFormatter().response = this.response;
        this.getFormatter().format();
    },

    getFormatter: function()
    {
        if (this.formatter === null) {
            this.formatFactory();
        }
        return this.formatter;
    }
};

module.exports = new Formatter();
