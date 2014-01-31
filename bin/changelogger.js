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
       .option('-t, --type <n>', 'output type (json, html)')
       .parse(process.argv);

var changelogger = new Changelogger();
changelogger.request.args        = program.args;
changelogger.request.destination = program.destination;
changelogger.request.type        = program.type;
changelogger.run();