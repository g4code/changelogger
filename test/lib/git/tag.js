
var should = require("chai").should(),
    GitTag = require("../../../lib/git/tag");

describe("GitTag", function(){

    describe("exec", function(done){

        it("should return git tag string", function(done){

            var gitTag = new GitTag();
            gitTag.setRepoPath("./")
                  .exec()
                  .on("exec", function(tags){
                      tags.should.be.a("string");
                      done();
                  });
        });

    });
});