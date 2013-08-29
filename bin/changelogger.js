#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program     = require('commander'),
    packageData = require(__dirname + '/../package.json');

program.version(packageData.version)
       .parse(process.argv);

console.log('changelogger bin');
