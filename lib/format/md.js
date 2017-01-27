
var fs         = require('fs'),
    evento     = require("evento"),
    _          = require("underscore"),
    mustache   = require("mustache");

function Md() {

};

module.exports = Md;

Md.prototype =
{
    response: null,

    format: function()
    {
        fs.readFile(__dirname+'/../templates/changelog.md', {encoding: "utf8"}, this.onReadFile.bind(this));
    },

    onReadFile: function (err, data)
    {
        if (err) {
            throw err;
        }

        this.response.output = mustache.render(data, this.response);

        evento.trigger('info', 'Output formatted to md');
        evento.trigger('formated');
    }
};

module.exports = new Md();
