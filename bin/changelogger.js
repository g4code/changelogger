#!/usr/bin/env node

/**
 * Module dependencies.
 */

var Changelogger = require("../lib/changelogger"),
    program      = require("commander"),
    packageData  = require(__dirname + "/../package.json");

program.version(packageData.version)
       .usage("[options] [dir]")
       .option('-d, --destination <n>', 'destination directory path')
       .option('-f, --format <n>', 'output format (json, html, md, bbmd)')
       .parse(process.argv);

var changelogger = new Changelogger();
changelogger.request.args        = program.args;
changelogger.request.destination = program.destination;
changelogger.request.format      = program.format;
changelogger.run();
