
var should = require("chai").should(),
    Commit = require("../../lib/commit"),
    tagWithNoTags = require("../stubs/tag-with-no-tags");

describe("Commit", function(){

    describe("init", function(){

        it("should find commits if there is no tags", function(done){

            var commit = new Commit();
            commit.findCommits = function() {
                "test".should.be.ok;
                done();
            };
            commit.setTag(tagWithNoTags)
                  .init();
        });
    });
});