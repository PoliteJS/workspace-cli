
var command = require('../lib/command');
var async = require('async');
var fs = require('fs');

exports.start = function() {
    async.series([
        gitClone,
        gitMoveFiles,
        gitMoveGitignore,
        cleanTempFolder,
        require('./subs/npm-install'),
        require('./subs/grunt-install'),
        require('./subs/grunt-build')
    ], function(err) {
        if (!err) {
            successMsg();
        } else {
            console.log('SETUP ERRORS!');
        }
    });
};

function gitClone(next) {
    console.log('WKS> cloning remote repository...');
    var cmd = command('git clone git@github.com:PoliteJS/workspace.git', {
        onExit: next
    });
}

function gitMoveFiles(next) {
    var cmd = command('mv workspace/* ./', {
        onExit: next
    });
}

function gitMoveGitignore(next) {
    var cmd = command('mv workspace/.gitignore ./', {
        onExit: next
    });
}

function cleanTempFolder(next) {
    var cmd = command('rm -rf ./workspace', {
        onExit: next
    });
}

function successMsg() {
    console.log('');
    console.log('');
    console.log('------------- PoliteJS Workspace is Ready --------------');
    console.log('now you can run "wks develop" to start a coding session!');
    console.log('--------------------------------------------------------');
    console.log('');
}
