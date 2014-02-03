
var fs         = require('fs'),
    evento     = require("evento"),
    _          = require("underscore");

function Presenter() {

};

Presenter.prototype = {

    request: null,

    response: null,

    createDir: function()
    {
        fs.mkdir(this.request.destinationDir, _.bind(this.dirCreated, this));
    },

    dirCreated: function()
    {
        evento.trigger('success', 'Destination dir created: '+this.request.destinationDir);
        this.writeToFile();
    },

    onExists: function(exists)
    {
        exists ? this.writeToFile() : this.createDir();
    },

    onMkdir: function(err)
    {
        err ?
            evento.trigger('error', err) :
            this.dirCreated();
    },

    onWriteFile: function(err)
    {
        err ?
            evento.trigger('error', err) :
            evento.trigger('success', 'Output saved to desctination file: '+this.request.destination);
    },

    present: function()
    {
        fs.exists(this.request.destinationDir, _.bind(this.onExists, this));
    },

    writeToFile: function()
    {
        fs.writeFile(
            this.request.destination,
            this.response.output,
            {encoding: "utf8"},
            _.bind(this.onWriteFile, this)
        );
    }
};

module.exports = new Presenter();