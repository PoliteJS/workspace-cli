
var commands = {
    info: require('./cmd/info'),
    init: require('./cmd/init'),
    develop: require('./cmd/develop'),
    release: require('./cmd/release'),
    ci: require('./cmd/ci')
};

exports.run = function() {
    
    var command = process.argv[2] || 'info';
    
    if (commands[command]) {
        commands[command].start();
    }
    
};
