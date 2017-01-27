
var evento    = require('evento'),
    informer  = require('informer'),
    validator = require('./changelogger/validator'),
    filter    = require('./changelogger/filter'),
    git       = require('./changelogger/git'),
    formatter = require('./changelogger/formatter'),
    presenter = require('./changelogger/presenter');

var timer = {
    start    : null,
    end      : null,
    execution: null
};

function Changelogger() {

    timer.start = new Date().getTime();

    informer.title("changelogger")
            .titleColor("cyan");

    evento.on("error",   informer.error.bind(informer));
    evento.on("success", informer.success.bind(informer));
    evento.on("info",    informer.info.bind(informer));
    evento.on("warning", informer.warning.bind(informer));
    evento.on("loading", informer.loading.bind(informer));

    evento.on("valid",     this.filter.bind(this));
    evento.on("filter",    this.git.bind(this));
    evento.on("git",       this.format.bind(this));
    evento.on("formated",  this.present.bind(this));
    evento.on("presented", this.finish.bind(this));
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

    finish: function()
    {
        timer.end      = new Date().getTime();
        timer.excution = (timer.end - timer.start)/1000;

        evento.trigger("info", "Executed in: "+timer.excution+"s");
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