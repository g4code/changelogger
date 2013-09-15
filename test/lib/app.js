
var should = require('chai').should(),
    App    = require("../../lib/app");
    path   = require("path");

describe('App', function(){

    var app = new App();

    beforeEach(function(){

        app.fullPath = null;
    });

    describe('getFullPath', function(){

        it('should return current dir full path', function(){

            app.setArgs([]).getFullPath().should.be.equal(path.resolve("./"));
        });

        it('should return parent dir full path', function(){

            app.setArgs(["../", ""]).getFullPath().should.be.equal(path.resolve("../"));
        });
    });
});