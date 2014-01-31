
function Json() {

};

module.exports = Json;

Json.prototype =
{
    commits: null,

    format: function()
    {
        console.log(this.commits);
    }
};

module.exports = new Json();