
var command = require('../lib/command');
var async = require('async');

var processes = [];






exports.start = function() {
    
    async.series([
        npmInstall,
        gruntInstall,
        startServer,
        gruntDevelop
    ], function(err) {
        if (err) {
            console.log('!!! WKS> Unable to startup development ennvironment!');
            console.log(err);
        }
    });
    
};

exports.stop = killProcesses;





function killProcesses() {
    processes.forEach(function(process) {
        process.kill();
    });
}

function npmInstall(next) {
    
    console.log('WKS> running "npm install"...');
    
    var cmd = command('npm install', {
        onSuccess: function() {
            next();
        },
        onError: function() {
            next('npm install failed');
        }
    });
    
    
    
}

function gruntInstall(next) {
    console.log('WKS> running "grunt install"...');
    
    var cmd = command('grunt install', {
        onSuccess: function() {
            next();
        },
        onError: function() {
            next('grunt install failed');
        }
    });
}

function startServer(next) {
    console.log('WKS> starting debug server...');
    
    var cmd = command('node lib/workspace/debug-server.js');
    cmd.on('exit', killProcesses);
    
    cmd.stdout.on('data', function(chunk) {
        console.log(chunk);
    });
    
    next();
}

function gruntDevelop(next) {
    console.log('WKS> starting develop session...');
    
    var cmd = command('grunt develop');
    cmd.on('exit', killProcesses);
    
    var show = false;
    cmd.stdout.on('data', function(chunk) {
        if (show && ~chunk.indexOf('Completed in ')) {
            console.log(chunk);
        } else {
            if (~chunk.indexOf('Waiting...')) {
                show = true;
            }
        }
    });
    
    next();
}

