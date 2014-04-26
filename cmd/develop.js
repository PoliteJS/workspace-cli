
var command = require('../lib/command');
var async = require('async');


var processes = [];

exports.start = function() {
    
    async.series([
        require('./subs/npm-install'),
        require('./subs/grunt-install'),
        gruntDevelop,
        startServer
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

function startServer(next) {
    console.log('WKS> starting debug server...');
    
    var cmd = command('grunt server');
    cmd.on('exit', killProcesses);
    
    var show = false;
    cmd.stdout.on('data', function(chunk) {
        if (show) {
            process.stdout.write(chunk);
            next();
        } else {
            if (~chunk.indexOf('Running "wks-debug-server:wkd"')) {
                show = true;
            }
        }
    });
}

function gruntDevelop(next) {
    console.log('WKS> starting develop session...');
    
    var cmd = command('grunt develop');
    cmd.on('exit', killProcesses);
    
    var show = false;
    cmd.stdout.on('data', function(chunk) {
        if (show && ~chunk.indexOf('Completed in ')) {
            process.stdout.write(chunk);
        } else {
            if (~chunk.indexOf('Waiting...')) {
                show = true;
            }
        }
    });
    
    next();
}

