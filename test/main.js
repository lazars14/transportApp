process.env.NODE_ENV = "test";

config = require("../config/");
logger = require('../lib/logger');

var should = require('should'),
  exec = require('child_process').exec;
var bcrypt = require('bcryptjs');

describe('main', function () {
  before(function (done) {
    console.log('Before test drop exitisting test database');
    return exec('mongo transportApp_test --eval "db.dropDatabase()"', function (err, data) {
      if (err) {
        console.log('Error droping exitisting test database');
        throw err;
      } else {
        console.log('Existing test database successfully droped');
        return done();
      }
    });
  });

  it('should successfully create client in db', function (done) {
    var passwordCrypted = bcrypt.hashSync("test", bcrypt.genSaltSync(8), null);
    return exec("mongo transportApp_test --eval \"db.clients.insertOne({email: \'client@gmail.com\', password: \'" + passwordCrypted  + "\', firstName: \'Joe\', lastName: \'Doe\'})\"", function (err, data) {
      if (err) {
        console.log('Error inserting client into db');
        throw err;
      } else {
        console.log('Successfully created client in db');
        return done();
      }
    });
  });

  it('should successfully drop test database', function (done) {
    require('../services/module_client/test');
    require('../services/module_manager/test');
    // require('../services/module_user/test');
    return done();
  });
});