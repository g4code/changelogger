
var should = require("chai").should(),
    Git    = require("../../lib/git");

describe("Git", function(){

    describe("status", function(){
        it("should return true if current folder is git repo", function(done){
            var git = new Git();
            git.setFullPath("./")
               .status(function(isGitRepo){
                   isGitRepo.should.be.true;
                   done();
               });
        });
    });

});