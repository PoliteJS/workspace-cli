
var command = require('../../lib/command');

module.exports = function(next) {
    console.log('WKS> running "npm install"...');
    
    var cmd = command('npm install', {
        onSuccess: function() {
            process.stdout.write('\r');
            next();
        },
        onError: function() {
            next('npm install failed');
        }
    });
    
    var max = 12;
    var count = 0;
    cmd.stdout.on('data', function(chunk) {
        count++;
        process.stdout.write(Math.round(count/max*100) + '% ');
    });
};