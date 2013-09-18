
var should         = require("chai").should(),
    _              = require("underscore"),
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

        it("should call tag method", function(done){

            var git = new Git();
            git.tag = function(){
                "test".should.be.ok;
                done();
            };
            git.onStatus(true);
        });

        it("should call notGitRepo method", function(done){

            var git = new Git();
            git.notGitRepo = function(){
                "test".should.be.ok;
                done();
            };
            git.onStatus(false);
        });
    });

    describe("log", function(){

        it("should return commit object", function(done){

            var git = new Git();
            git.onLog = function(commits){
                commits.should.be.an("object");
                _.values(commits)[0].should.be.an("object");
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

        it("should set commits", function(){

            var git = new Git();
            git.setRepoPath("./")
               .onLog(commitsFixture);
            git.commits.should.equal(commitsFixture);
        });
    });

    describe("tag", function(){

        it("should return tag array", function(done){

            var git = new Git();
            git.onTag = function(tags){
                this.tag.tags.should.equal(tags);
                this.tag.tags.should.be.a("array");
                done();
            };
            git.setRepoPath("./")
               .tag();
        });
    });

    describe("onTag", function(){

        it("should set tags", function(){


        });
    });

});