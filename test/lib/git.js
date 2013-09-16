
var should         = require("chai").should(),
    Git            = require("../../lib/git"),
    commitsFixture = require("../fixtures/commits"),
    tagsFixture    = require("../fixtures/tags");

describe("Git", function(){

    describe("status", function(){

        it("should return true if current folder is git repo", function(done){

            var git = new Git();
            git.onStatus = function(isGitRepo){
                isGitRepo.should.be.true;
                done();
            };
            git.setRepoPath("./")
               .status();
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
            git.onLog = function(commits){
                commits.should.be.an("array");
                commits[0].should.be.an("object");
                done();
            };
            git.setRepoPath("./")
               .log();
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
            git.onLog(commitsFixture);
        });

        it("should set commits", function(){

            var git = new Git();
            git.setRepoPath("./")
               .onLog(commitsFixture);
            git.commits.should.equal(commitsFixture);
        });
    });

    describe("tag", function(){

        it("should return tag string", function(done){

            var git = new Git();
            git.onTag = function(tags){
                tags.should.be.a("string");
                done();
            };
            git.setRepoPath("./")
               .tag();
        });
    });

    describe("onTag", function(){

        it("should set tags", function(){

            var git = new Git();
            git.onTag(tagsFixture);
            git.tags.should.equal(tagsFixture);
        });
    });

});