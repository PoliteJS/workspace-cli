/**
 * Wrapper to run child process
 */

var extend = require('extend');
var childProcess = require('child_process');

module.exports = function(cmd, options) {
    
    options = extend({}, {
        handler: function() {},
        onSuccess: function(cl) {},
        onError: function(code, cl) {},
        onExit: function(code, cl) {}
    }, options || {});
    
    var cl = childProcess.exec(cmd, options.handler);
    
    cl.on('exit', function(code) {
        if (options['onExitCode'+code]) {
            options['onExitCode'+code](cl)
        }
        if (code === 0) {
            options.onSuccess(cl);
        } else {
            options.onError(code, cl);
        }
        options.onExit(code, cl);
    });
    
    return cl;
};
