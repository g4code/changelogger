
var should = require("chai").should(),
    _      = require("underscore"),
    GitLog = require("../../../lib/git/log");

describe("GitLog", function(){

    var rawCommitData = "abbreviatedHash<#|#>hash<#|#>authorName<#|#>authorDate<#|#>subject",
        commitDataObj = {
            abbreviatedHash: "abbreviatedHash",
            hash:            "hash",
            authorName:      "authorName",
            authorDate:      "authorDate",
            subject:         "subject"
        };


    describe("exec", function(){
        it("should return commit objects", function(done){
            var gitLog = new GitLog();
            gitLog.setRepoPath("./")
                  .exec()
                  .on("exec", function(commits){
                      commits.should.be.an("object");
                      _.values(commits)[0].should.be.an("object");
                      done();
                  });
        });
    });

    describe("getPrettyFormat", function(){
        it("should return git pretty format string", function(){
            var gitLog = new GitLog();
            gitLog.getPrettyFormat().should.be.a("string");
            gitLog.getPrettyFormat().should.equal("%h<#|#>%H<#|#>%an<#|#>%ad<#|#>%s<#/#>")
        });
    });

    describe("removeNewLines", function(){
        it("should remove all newline characters", function(){
            var gitLog = new GitLog();
            gitLog.setRawData("aaa\nbbb\n")
                  .removeNewLines();
            gitLog.rawData.should.equal("aaabbb");
        });
    });

    describe("splitRawDataToCommits", function(){
        it("should split sring to array", function(){
            var gitLog = new GitLog();
            gitLog.setRawData("aaa<#/#>bbb")
                  .splitRawDataToCommits();
            gitLog.rawCommits.should.be.an("array");
            gitLog.rawCommits.length.should.equal(2);
            gitLog.rawCommits[0].should.equal("aaa");
            gitLog.rawCommits[1].should.equal("bbb");
        });
    });

    describe("createCommitObjFromRawCommitData", function(){
        it("should return object literal from string", function(){
            var gitLog = new GitLog();
            JSON.stringify(gitLog.createCommitObjFromRawCommitData(rawCommitData)).should.equal(JSON.stringify(commitDataObj));
        });
    });

    describe("parseCommitData", function(){
        it("should create commit object literal from a raw commit string", function(){
            var gitLog = new GitLog();
            gitLog.rawCommits = [rawCommitData];
            gitLog.parseCommitData();
            JSON.stringify(gitLog.rawCommits[0]).should.equal(JSON.stringify(commitDataObj));
        });
    });
});