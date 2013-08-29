#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program     = require('commander');
var packageData = require('../package.json');

program.version('x.x.x')
       .parse(process.argv);

console.log('changelogger bin');
