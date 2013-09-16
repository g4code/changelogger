
var should    = require("chai").should();
    Formatter = require("../../lib/formatter"),
    commits   = require("../fixtures/commits");

describe("Formatter", function(){

    describe("format", function(){

        var formatter = new Formatter();
        formatter.setCommits(commits)
                 .setFormatType("console")
                 .format();
    });
});