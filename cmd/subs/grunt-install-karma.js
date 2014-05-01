
var command = require('../../lib/command');

module.exports = function(next) {
    console.log('WKS> running "grunt wks-install-karma"...');
    
    var cmd = command('grunt wks-install-karma', {
        onSuccess: function() {
            next();
        },
        onError: function() {
            next('failed to install karma');
        }
    });
};