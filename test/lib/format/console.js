
var should = require("chai").should();
    ConsoleFormat = require("../../../lib/format/console");

describe("ConsoleFormat", function(){

    describe("format", function(){

        consoleFormat = new ConsoleFormat();
        consoleFormat.setGit({})
                     .format();
    });
});