
var command = require('../lib/command');
var async = require('async');


var processes = [];

exports.start = function() {
    
    async.series([
        require('./subs/npm-install'),
        require('./subs/grunt-install'),
        gruntRelease,
        gruntTest,
        startServer
    ], function(err) {
        if (err) {
            console.log('!!! WKS> ERR[' + err + '] > Unable to release that app!');
            console.log('!!! WKS> try to run "grunt release" and "grunt test" alone to seek for errors!');
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
    console.log('WKS> starting release server...');
    
    var cmd = command('grunt server-release');
    cmd.on('exit', killProcesses);
    
    var show = false;
    cmd.stdout.on('data', function(chunk) {
        if (show) {
            process.stdout.write(chunk);
            next();
        } else {
            if (~chunk.indexOf('Running "wks-debug-server:wkr"')) {
                show = true;
            }
        }
    });
}

function gruntRelease(next) {
    console.log('WKS> building release...');
    
    var cmd = command('grunt release', {
        onExit: next
    });
}

function gruntTest(next) {
    console.log('WKS> running tests...');
    
    var cmd = command('grunt test', {
        onExit: next
    });
}

