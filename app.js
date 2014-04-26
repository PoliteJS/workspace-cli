
var commands = {
    develop: require('./cmd/develop')
};

exports.run = function() {
    commands.develop.start();
};
