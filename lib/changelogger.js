
var evento    = require('evento'),
    _         = require('underscore'),
    informer  = require('informer'),
    validator = require('./changelogger/validator'),
    filter    = require('./changelogger/filter'),
    git       = require('./changelogger/git'),
    formatter = require('./changelogger/formatter'),
    presenter = require('./changelogger/presenter');


function Changelogger() {

    informer.title("changelogger")
            .titleColor("cyan");

    evento.on("error",   _.bind(informer.error,   informer));
    evento.on("success", _.bind(informer.success, informer));
    evento.on("info",    _.bind(informer.info,    informer));
    evento.on("warning", _.bind(informer.warning, informer));
    evento.on("loading", _.bind(informer.loading, informer));

    evento.on("valid",    _.bind(this.filter,  this));
    evento.on("filter",   _.bind(this.git,     this));
    evento.on("git",      _.bind(this.format,  this));
    evento.on("formated", _.bind(this.present, this));
}

module.exports = Changelogger;

Changelogger.prototype = {

    request: {
        args: null,
        destination: null,
        format: null
    },

    response: null,

    filter: function()
    {
        filter.request = this.request;
        filter.filter();
    },

    format: function(response)
    {
        this.response      = response;
        formatter.request  = this.request;
        formatter.response = this.response;
        formatter.format();
    },

    git: function()
    {
        git.request = this.request;
        git.start();
    },

    present: function()
    {
        presenter.request  = this.request;
        presenter.response = this.response;
        presenter.present();
    },

    run: function()
    {
        validator.request = this.request;
        validator.validate();
    }
};