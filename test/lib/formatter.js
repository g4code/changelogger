
var should = require("chai").should();
    Formatter = require("../../lib/formatter");

describe("Formatter", function(){

    var commits = [{
            abbreviatedHash: 'e344135',
            hash: 'e34413548f5c989e65d7155212fe81f07bbcbce5',
            authorName: 'Drasko Gomboc',
            authorDate: '2013-08-27 17:02:10 +0200',
            subject: 'npm package config added'
        },
        {
            abbreviatedHash: '0d1e5f1',
            hash: '0d1e5f1b3277e08a724db40ce35aa4d755d6e3c8',
            authorName: 'Drasko Gomboc',
            authorDate: '2013-08-27 16:36:13 +0200',
            subject: 'makefile added'
        }];

    describe("format", function(){

        var formatter = new Formatter();
        formatter.setCommits(commits)
                 .setFormatType("console")
                 .format();
    });
});