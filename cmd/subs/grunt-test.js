
var command = require('../../lib/command');

module.exports = function(next) {
    console.log('WKS> running "grunt test"...');
    
    var cmd = command('grunt test', {
        onSuccess: function() {
            next();
        },
        onError: function() {
            next('failed to run karma tests');
        }
    });
};