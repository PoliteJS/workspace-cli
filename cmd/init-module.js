
var command = require('../lib/command');
var async = require('async');
var fs = require('fs');

exports.start = function(name) {
    
    var tasks = [
        moduleName.bind(name),
        makeFolder,
        createIndex
    ];
    
    async.waterfall(tasks, function(err, featureName) {
        if (!err) {
            console.log('WKS> module "' + featureName + '" was succesfully created!');
        } else {
            console.log('ERROR> impossible to create the new module!', err);
        }
    });
    
};


function moduleName(next) {
    var i = 1;
    var folderName = this;
    while (fs.existsSync('src/features/' + folderName) || fs.existsSync('src/modules/' + folderName)) {
        folderName = this + '-' + i;
        i++;
    }
    next(null, folderName);
}

function makeFolder(folderName, next) {
    fs.mkdir('src/modules/' + folderName, function(err) {
        next(err, folderName);
    });
}

function createIndex(folderName, next) {
    var content =   '// Module: ' + folderName + '\n\n';
        content+=  'module.exports = function() {\n'
        content+=  '\tconsole.log("module ' + folderName + '");\n'
        content+=  '};\n\n'
    fs.writeFile('src/modules/' + folderName + '/index.js', content, function(err) {
        next(err, folderName);
    });
}
