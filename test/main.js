process.env.NODE_ENV = "test";

config = require("../config/");
logger = require('../lib/logger');

var should = require('should'),
  exec = require('child_process').exec;
  
var clientModel = require('./../model/client/model');

describe('main', function () {

  it('should successfully drop db', function (done) {
    this.timeout(0);
    return exec('mongo transportApp_test --eval "db.dropDatabase()"', function (err, data) {
      if (err) {
        throw err;
      } else {
        return done();
      }
    });

  });

  it('should successfully create client in db', function (done) {
    const dummyClient = {
      email: 'client@gmail.com',
      password: 'test',
      firstName: 'Joe',
      lastName: 'Doe'
    }

    clientModel.createDummyClient(dummyClient).then(function (client) {
      return done();
    }).fail(function (err) {
      throw err;
    });

  });

  it('all tests', function (done) {
    this.timeout(0);

    require('../services/module_client/test');
    require('../services/module_manager/test');
    require('../services/module_user/test');
    require('../services/module_manager/test/index1');
    return done();
  });
});