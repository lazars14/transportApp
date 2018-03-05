var config = require('../config/'),
    jwt    = require('jsonwebtoken'),
    clientModel = require('../model/client/model'),
    managerModel = require('../model/manager/model'),
    userModel = require('../model/user/model');

var Auth = {

  checkClientToken: function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.headers['x-access-token'];
    if (!token) return next(error('FORBIDDEN'));
    // verifies secret and checks exp
    jwt.verify(token, config.token.secret, function (err, decoded) {
      if (err) {
        if (err.message == 'jwt expired'){
          return next(error('EXPIRED'));
        } else {
          return next(error('FORBIDDEN'));
        }
      }
      if (!decoded) {
        return next(error('FORBIDDEN'));
      }
      if (!req.params.clientId) {
        return next(error('FORBIDDEN'));
      }
      if (req.params.clientId != decoded.clientId) {
        return next(error('FORBIDDEN'));
      }
      // if everything is good, save to request for use in other routes
      // req.decoded = decoded;
      next();
    });
  },

  checkManagerToken: function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.headers['x-access-token'];
    if (!token) return next(error('FORBIDDEN'));
    // verifies secret and checks exp
    jwt.verify(token, config.token.secret, function (err, decoded) {
      if (err) {
        if (err.message == 'jwt expired'){
          return next(error('EXPIRED'));
        } else {
          return next(error('FORBIDDEN'));
        }
      }
      if (!decoded) {
        return next(error('FORBIDDEN'));
      }
      if (!req.params.managerId) {
        return next(error('FORBIDDEN'));
      }
      if (req.params.managerId != decoded.managerId) {
        return next(error('FORBIDDEN'));
      }
      // if everything is good, save to request for use in other routes
      // req.decoded = decoded;
      next();
    });
  },

  checkUserToken: function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.headers['x-access-token'];
    if (!token) return next(error('FORBIDDEN'));
    // verifies secret and checks exp
    jwt.verify(token, config.token.secret, function (err, decoded) {
      if (err) {
        if (err.message == 'jwt expired'){
          return next(error('EXPIRED'));
        } else {
          return next(error('FORBIDDEN'));
        }
      }
      if (!decoded) {
        return next(error('FORBIDDEN'));
      }
      if (!req.params.userId) {
        return next(error('FORBIDDEN'));
      }
      if (req.params.userId != decoded.userId) {
        return next(error('FORBIDDEN'));
      }
      // if everything is good, save to request for use in other routes
      // req.decoded = decoded;
      next();
    });
  },

  checkClientId: function(req, res, next){
    clientModel.findById(req.params.clientId).then(function(client){
      if(!client) return next(error('NOT_FOUND'));
      next();
    }).fail(function(err){
      return next(err);
    });
  },

  checkManagerId: function(req, res, next){
    managerModel.findById(req.params.managerId).then(function(manager){
      if(!manager) return next(error('NOT_FOUND'));
      next();
    }).fail(function(err){
      return next(err);
    });
  },

  checkUserId: function(req, res, next){
    userModel.findById(req.params.userId).then(function(user){
      if(!user) return next(error('NOT_FOUND'));
      next();
    }).fail(function(err){
      return next(err);
    });
  },


};

module.exports = Auth;