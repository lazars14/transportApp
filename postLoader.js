var fs = require('fs');

/**
 * load all other stuff that needs to be loaded after server starts
 * all postLoaders are loaded from services folder.
 * Each service folder can contain postLoader.js file.
 *
 *  __dirname/services/FOO/postLoader.js
 *
 * This is a convention and MUST be followed
 *
 * All postLoader.js files need to implement load method
 *
 */
exports.load = function (app) {
  fs.readdirSync(__dirname + '/services/').forEach(function (dir) {
    if (fs.lstatSync(__dirname + '/services/' + dir).isDirectory()) {

      logger.info('trying to find postLoader for ', dir);
      fs.exists(__dirname + '/services/' + dir + '/postLoader.js', function (exists) {
        if (exists) {
          var postLoader = require(__dirname + '/services/' + dir + '/postLoader.js');
          postLoader.load(app);
        }
      });
    }
  });
};

