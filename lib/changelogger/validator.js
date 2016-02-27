
var _      = require("underscore"),
    fs     = require("fs"),
    evento = require("evento");

function Validator() {

};

Validator.prototype = {

    request: null,


    checkArgs: function()
    {
        if (!this.isArgValid()) {
            throw "no dir argument";
        }
        try {
            this.isDir(this.request.args[0]);
        } catch (e) {
            throw this.request.args[0] + " is not a directory";
        }
        return this;
    },

    checkDestination: function()
    {
        if (_.isEmpty(this.request.destination)) {
            throw "destination option can not be empty";
        }
        try {
            this.isDir(this.request.destination);
        } catch (e) {
            throw this.request.destination + " is not a directory";
        }
        return this;
    },

    checkFormat: function()
    {
        if (_.isEmpty(this.request.format)) {
            throw 'format option can not be empty';
        }
        if (!this.isFormatValid()) {
            throw this.request.format + ' is not a valid option';
        }
        return this;
    },

    isArgValid: function()
    {
        return _.isArray(this.request.args)
            && this.request.args.length == 1;
    },

    isDir: function(path)
    {
        stats = fs.lstatSync(path);
        if (!stats.isDirectory()) {
            throw "err";
        }
    },

    isFormatValid: function()
    {
        return this.request.format === 'json'
            || this.request.format === 'html'
            || this.request.format === 'md'
            || this.request.format === 'bbmd';
    },

    validate: function()
    {
        try {
            this.checkArgs()
                .checkFormat()
                .checkDestination();
            evento.trigger("valid");
        } catch(err) {
            evento.trigger("error", err);
        }
    }
};

module.exports = new Validator();
