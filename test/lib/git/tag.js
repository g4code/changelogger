
var should = require("chai").should(),
    GitTag = require("../../../lib/git/tag");

describe("GitTag", function(){

    describe("exec", function(done){

        it("should return git tag array", function(done){

            var gitTag = new GitTag();
            gitTag.setRepoPath("./")
                  .exec()
                  .on("exec", function(tags){
                      tags.should.be.an("array");
                      done();
                  });
        });
    });

    describe("splitRawDataToTags", function(){

        it("should create tags array", function(){

            var gitTag = new GitTag();
            gitTag.setRawData("v0.0.1\nv0.0.2")
                  .splitRawDataToTags();
            gitTag.tags.should.be.an("array");
            gitTag.tags.length.should.equal(2);
        });
    });

    describe("filterTags", function(){

        it("should remove empty array element", function(){

            var gitTag = new GitTag();
            gitTag.tags = ["v1", ""];
            gitTag.filterTags();
            gitTag.tags.length.should.be.equal(1);
            gitTag.tags[0].should.equal("v1");
        });
    });

    describe("hasTags", function(){

        it("should return true if repo has tags", function(){
            var gitTag = new GitTag();
            gitTag.tags = ["v1", "v2"];
            gitTag.hasTags().should.be.true;
            gitTag.tags = [];
            gitTag.hasTags().should.be.false;
        });
    });
});