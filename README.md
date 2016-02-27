# changelogger

> Git changelog generator - [nodejs](http://nodejs.org) library

[![NPM](https://nodei.co/npm/changelogger.png)](https://nodei.co/npm/changelogger/)

## Install

    $ npm install -g changelogger

## Usage

    Usage: changelogger [options] [dir]

    Options:

        -h, --help             output usage information
        -V, --version          output the version number
        -d, --destination <n>  destination directory path
        -f, --format <n>       output format (json, html, md, bbmd)
                                 * bbmd stands for BitBucket Markdown

eg

    $ changelogger --destination /destination/path --format html /repo/path

## License

(The MIT License)
see [LICENSE](https://github.com/g4code/changelogger/blob/master/LICENSE) file for details...
