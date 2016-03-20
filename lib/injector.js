'use strict';

var fs = require('fs');
var path = require('path');
var util = require('util');

var SEP = '/';
var DEFAULT_CONFIG_FILENAME = 'injectorConfig.json';

function getInPath(source, moduleName) {
    var current = source;
    var pathParts = moduleName.split(SEP);
    var part = pathParts.shift();
    while (pathParts.length) {
        if (current.hasOwnProperty(part)) {
            current = current[part];
            part = pathParts.shift();
        } else {
            return undefined;
        }
    }
    return current[part];
}

var _require = module.parent.require;

module.exports = {
    config: function (basePath, config) {
        if (!config) {
            config = JSON.parse(fs.readFileSync(path.join(basePath, DEFAULT_CONFIG_FILENAME)));
        }
        global.inject = function inject(moduleName) {
            var resolved = getInPath(config.modules, moduleName);
            if (util.isString(resolved)) {
                resolved = path.join(basePath, config.base, resolved);
                //console.log("injecting: ", resolved);
                return _require(resolved);
            } else {
                resolved = moduleName;
                //console.log("require: ", resolved);
                return require(resolved);
            }
        };
    }
};