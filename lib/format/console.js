
function Console() {

};

module.exports = Console;

Console.prototype =
{
    git: null,

    format: function()
    {

    },

    setGit: function(git)
    {
        this.git = git;

        return this;
    }
}
