var express = require('express'),
    fs      = require('fs');

/**
 * load routes
 * all routes are loaded from services folder.
 * Each service folder contains router.js file.
 *
 *  __dirname/services/FOO/router.js
 *
 * This is a convention and MUST be followed
 *
 * All loaded routes have a service directory name as a prefix
 *
 * http://<host>:<port>/service_dir_name/route_name
 */
exports.load = function (app) {
  fs.readdirSync(__dirname + '/services/').forEach(function (dir) {
    if (fs.lstatSync(__dirname + '/services/' + dir).isDirectory()) {
      var routes = require(__dirname + '/services/' + dir + '/router.js');
      app.use('/' + dir.match(/module_(.*)/)[1], routes);
    }
  });
};
