
var commands = {
    info: require('./cmd/info'),
    init: require('./cmd/init'),
    develop: require('./cmd/develop')
};

exports.run = function() {
    
    var command = process.argv[2] || 'info';
    
    if (commands[command]) {
        commands[command].start();
    }
    
};
