
var command = require('../lib/command');
var async = require('async');
var fs = require('fs');

exports.start = function() {
    
    var tasks = [
        gitClone,
        gitMoveFiles,
        gitMoveGitignore,
        cleanTempFolder,
        require('./subs/npm-install'),
        require('./subs/grunt-install'),
        require('./subs/grunt-build')
    ];
    
    // skip git-clone if a project is already initialized
    if (fs.existsSync('package.json')) {
        console.log('WKS> skip Git cloning because this is an existing project!');
        console.log('WKS> next time you should just run "wks develop"');
        tasks.shift();
        tasks.shift();
        tasks.shift();
        tasks.shift();
    }
    
    async.series(tasks, function(err) {
        if (!err) {
            successMsg();
        } else {
            console.log('SETUP ERRORS!', err);
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
