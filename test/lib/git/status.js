
var should    = require('chai').should(),
    GitStatus = require("../../../lib/git/status");

describe('GitStatus', function(){

    describe('exec', function(){

        it('should return true if dir is a git repo', function(done){

            var gitStatus = new GitStatus();

            gitStatus.setRepoPath("./")
                     .exec()
                     .on("exec", function(isGitRepo){
                         isGitRepo.should.be.true;
                         done();
                     });
        });

        it('should return false if dir is not a git repo', function(done){

            var gitStatus = new GitStatus();

            gitStatus.setRepoPath("/")
                     .exec()
                     .on("exec", function(isGitRepo){
                         isGitRepo.should.be.false;
                         done();
                     });
        });
    });

});