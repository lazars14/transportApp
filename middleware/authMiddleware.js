var config = require('../config/'),
    jwt    = require('jsonwebtoken');

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
      req.params.clientID = decoded.clientID;
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
      // if everything is good, save to request for use in other routes
      // req.decoded = decoded;
      req.params.userID = decoded.userID;
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
      // if everything is good, save to request for use in other routes
      // req.decoded = decoded;
      req.params.userID = decoded.userID;
      next();
    });
  }
};

module.exports = Auth;