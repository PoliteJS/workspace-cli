
var command = require('../../lib/command');

module.exports = function(next) {
    console.log('WKS> running "grunt install"...');
    
    var cmd = command('grunt install', {
        onSuccess: function() {
            next();
        },
        onError: function() {
            next('grunt install failed');
        }
    });
};