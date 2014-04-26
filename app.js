
var commands = {
    init: require('./cmd/init'),
    develop: require('./cmd/develop')
};

exports.run = function() {
    
    var command = process.argv[2] || 'develop';
    
    if (commands[command]) {
        commands[command].start();
    }
    
};
