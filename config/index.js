/**
 * fetch config file by passed environment variable name.
 * if there is no environment variable, test environment config file is being loaded
 * @type {*|string}
 */
var env = process.env.NODE_ENV || 'test',
  cfg = require('../config/config.' + env + '.js');
  
module.exports = cfg;