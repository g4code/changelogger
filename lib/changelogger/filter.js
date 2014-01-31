
var path   = require("path")
    evento = require("evento"),
    _      = require("underscore");

function Filter() {

};

Filter.prototype = {

    request: null,

    destination: function()
    {
        this.request.destination = path.resolve(this.request.destination);
        return this;
    },

    dir: function()
    {
        this.request.repository = path.resolve(this.request.args[0])
        delete this.request.args;
        return this;
    },

    filter: function()
    {
        this.dir()
            .destination();
        evento.trigger("info", "Repository: " +this.request.repository);
        evento.trigger("info", "Destination: "+this.request.destination);
        evento.trigger("info", "Type: "       +this.request.type);
        evento.trigger("filter");
    }
};

module.exports = new Filter();