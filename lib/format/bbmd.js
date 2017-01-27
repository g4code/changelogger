
var fs         = require('fs'),
    evento     = require("evento"),
    _          = require("underscore"),
    mustache   = require("mustache");

function BitbucketMd() {

};

module.exports = BitbucketMd;

BitbucketMd.prototype =
{
    response: null,

    format: function()
    {
        fs.readFile(__dirname+'/../templates/changelog-bitbucket.md', {encoding: "utf8"}, this.onReadFile.bind(this));
    },

    onReadFile: function (err, data)
    {
        if (err) {
            throw err;
        }

        this.response.generateLink = function () {
            return function (text, render) {
                var result = render(text);
                return 'markdown-header-'
                    + result
                        .toLowerCase()
                        .replace(' ', '-')
                        .replace(/[^\w\s\d-]/g, '');
            }
        };

        this.response.output = mustache.render(data, this.response);

        evento.trigger('info', 'Output formatted to md');
        evento.trigger('formated');
    }
};

module.exports = new BitbucketMd();
