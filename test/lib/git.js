
var should  = require("chai").should(),
    Git     = require("../../lib/git"),
    commits = require("../fixtures/commits");

describe("Git", function(){

    describe("status", function(){

        it("should return true if current folder is git repo", function(done){

            var git = new Git();
            git.setRepoPath("./")
               .status(function(isGitRepo){
                   isGitRepo.should.be.true;
                   done();
               });
        });
    });

    describe("onStatus", function(){

        it("should call log method", function(){

            var git = new Git();
            git.log = function(){
                "test".should.be.ok;
            };
            git.onStatus(true);
        });

        it("should call notGitRepo method", function(){

            var git = new Git();
            git.notGitRepo = function(){
                "test".should.be.ok;
            };
            git.onStatus(false);
        });
    });

    describe("log", function(){

        it("should return commit array", function(done){

            var git = new Git();
            git.setRepoPath("./")
               .log(function(commits){
                   commits.should.be.an("array");
                   commits[0].should.be.an("object");
                   done();
               });
        });
    });

    describe("onLog", function(){

        it("should call noCommits method", function(done){

            var git = new Git();
            git.noCommits = function(){
                "test".should.be.ok;
                done();
            };
            git.onLog([]);
        });

        it("should call tag method", function(done){

            var git = new Git();
            git.tag = function(){
                "test".should.be.ok;
                done();
            };
            git.onLog(commits);
        });
    });

});