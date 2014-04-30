
var command = require('../lib/command');
var async = require('async');


var processes = [];

exports.start = function() {
    
    async.series([
        require('./subs/npm-install'),
        require('./subs/grunt-install'),
        startCi,
        runCi
    ], function(err) {
        if (err) {
            console.log('!!! WKS> ERR[' + err + '] > Unable to run ci process!');
        }
    });
    
};

exports.stop = killProcesses;





function killProcesses() {
    processes.forEach(function(process) {
        process.kill();
    });
}

function startCi(next) {
    console.log('WKS> starting CI server...');
    
    var cmd = command('grunt start-ci');
    cmd.on('exit', killProcesses);
    
    var show = false;
    cmd.stdout.on('data', function(chunk) {
        if (show) {
            process.stdout.write(chunk);
        } else {
            if (~chunk.indexOf('Connected on socket')) {
                show = true;
                next();
            }
        }
    });
}

function runCi(next) {
    console.log('WKS> running CI...');
    
    var cmd = command('grunt ci');
    cmd.on('exit', killProcesses);
    
    var show = false;
    cmd.stdout.on('data', function(chunk) {
        if (show) {
            process.stdout.write(chunk);
            next();
        } else {
            if (~chunk.indexOf('Running "karma:wks-ci:run"')) {
                show = true;
            }
        }
    });
}
