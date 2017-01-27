
var fs         = require('fs'),
    evento     = require("evento"),
    _          = require("underscore"),
    mustache   = require("mustache");

function Html() {

};

module.exports = Html;

Html.prototype =
{
    response: null,

    format: function()
    {
        fs.readFile(__dirname+'/../templates/changelog.html', {encoding: "utf8"}, this.onReadFile.bind(this));
    },

    onReadFile: function (err, data)
    {
        if (err) {
            throw err;
        }

        this.response.output = mustache.render(data, this.response);

        evento.trigger('info', 'Output formatted to html');
        evento.trigger('formated');
    }
};

module.exports = new Html();