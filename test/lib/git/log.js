var should = require("chai").should(),
    GitLog = require("../../../lib/git/log");

describe("GitLog", function(){

    describe("exec", function(){
        it("should return commit log string", function(done){
            var gitLog = new GitLog();
            gitLog.setRepoPath("./")
                  .exec()
                  .on("exec", function(log){
                      log.should.be.a("string");
                      done();
                  });
        });
    });

    describe("getPrettyFormat", function(){
        it("should return git pretty format string", function(){
            var gitLog = new GitLog();
            gitLog.getPrettyFormat().should.be.a("string");
            gitLog.getPrettyFormat().should.equal("%h %H %an %ad %s")
        });
    });
});