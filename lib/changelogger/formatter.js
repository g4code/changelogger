
var evento = require("evento"),
    _      = require("underscore");

function Formatter() {

};

Formatter.prototype = {

    request: null,

    response: null,

    format: function()
    {
        console.log(this.response);
    }
};

module.exports = new Formatter();