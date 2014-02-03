
var evento     = require("evento"),
    _          = require("underscore");

function Json() {

};

module.exports = Json;

Json.prototype =
{
    response: null,

    format: function()
    {
        this.response.output = this.response.commits;
        evento.trigger('info', 'Output formatted to json');
        evento.trigger('formated');
    }
};

module.exports = new Json();