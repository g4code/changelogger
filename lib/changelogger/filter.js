
var path   = require("path")
    evento = require("evento"),
    _      = require("underscore");

function Filter() {

};

Filter.prototype = {

    request: null,

    name: 'changelog',

    destination: function()
    {
        this.request.destinationDir = path.resolve(this.getDestinationDir());
        this.request.destination    = path.resolve(this.getFullDestination());
        return this;
    },

    dir: function()
    {
        this.request.repository = path.resolve(this.request.args[0]);
        delete this.request.args;
        return this;
    },

    filter: function()
    {
        this.dir()
            .destination();
        evento.trigger("info", "Repository: " +this.request.repository);
        evento.trigger("info", "Destination: "+this.request.destination);
        evento.trigger("info", "Format: "     +this.request.format);
        evento.trigger("filter");
    },

    getDestinationDir: function()
    {
        return [
            this.request.destination,
            this.request.format
        ].join('/');
    },

    getFullDestination: function()
    {
        return [
            this.getDestinationDir(),
            this.fileName,
            this.getFileName()
        ].join('/');
    },

    getFileName: function()
    {
        var format = this.request.format;
        if (format === 'bbmd') {
            format = 'md';
        }
        return this.name + '.' + format;
    }
};

module.exports = new Filter();
