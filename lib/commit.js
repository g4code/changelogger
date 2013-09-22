
function Commit() {

};

module.exports = Commit;

Commit.prototype = {

    /**
     * GitTag object
     */
    tag: null,

    init: function()
    {
        this.tag.hasTags() ? this.findCommitsByTags() : this.findCommits();
    },

    setTag: function(gitTag)
    {
        this.tag = gitTag;

        return this;
    }

};