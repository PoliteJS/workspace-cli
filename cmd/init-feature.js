
var command = require('../lib/command');
var async = require('async');
var fs = require('fs');

exports.start = function(name) {
    
    var tasks = [
        featureName.bind(name),
        makeFolder,
        createIndex
    ];
    
    async.waterfall(tasks, function(err, featureName) {
        if (!err) {
            console.log('WKS> feature "' + featureName + '" was succesfully created!');
        } else {
            console.log('ERROR> impossible to create the new feature!', err);
        }
    });
    
};


function featureName(next) {
    var i = 1;
    var folderName = this;
    while (fs.existsSync('src/features/' + folderName) || fs.existsSync('src/modules/' + folderName)) {
        folderName = this + '-' + i;
        i++;
    }
    next(null, folderName);
}

function makeFolder(folderName, next) {
    fs.mkdir('src/features/' + folderName, function(err) {
        next(err, folderName);
    });
}

function createIndex(folderName, next) {
    var content =   '// Feature: ' + folderName + '\n\n';
        content+=  'exports.init = function(config) {\n'
        content+=  '\tconsole.log("init feature ' + folderName + '");\n'
        content+=  '}\n\n'
        content+=  'exports.start = function() {\n'
        content+=  '\tconsole.log("start feature ' + folderName + '");\n'
        content+=  '}\n\n'
    fs.writeFile('src/features/' + folderName + '/index.js', content, function(err) {
        next(err, folderName);
    });
}
