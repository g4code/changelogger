
var path = require("path"),
    _    = require("underscore"),
    Git  = require("./git");

function App() {

};

module.exports = App;

App.prototype = {

    args: [],

    fullPath: null,

    setArgs: function(programArgs)
    {
        this.args = programArgs;

        return this;
    },

    init: function()
    {
        var git = new Git()
        git.setRepoPath(this.getFullPath())
           .init();
    },

    getFullPath: function()
    {
        if(this.fullPath === null) {
            this.fullPath = path.resolve(this.args.shift() || "./");
        }

        return this.fullPath;
    }
};