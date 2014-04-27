
var command = require('../../lib/command');

module.exports = function(next) {
    console.log('WKS> running "grunt build"...');
    
    var cmd = command('grunt build', {
        onSuccess: function() {
            next();
        },
        onError: function() {
            next('grunt build failed');
        }
    });
};