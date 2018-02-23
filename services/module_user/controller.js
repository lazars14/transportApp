var userModel = require('../../model/user/model');
var destinationRequestModel = require('../../model/destinationRequest/model');

var isEmail = require('validator/lib/isEmail');
var logger = require('../../lib/logger');

// User functions

/**
 * Register user
 * @param req
 * @param res
 * @param next
 */
exports.registerUser = function(req, res, next){
    if(!req.body.email){
        logger.error('Error - Register user - Email can\'t be empty');
        return next(error("BAD_REQUEST"));
    }

    if(!isEmail(req.body.email)){
        logger.error('Error - Register user - Wrong email format');
        return next(error("BAD_REQUEST"));
    }

    if(!req.body.password){
        logger.error('Error - Register user - Password can\'t be empty');
        return next(error("BAD_REQUEST"));
    }

    userModel.register(req.body).then(function(user){
        res.json(user);
    }).fail(function(err){
        return next(err);
    });
}

// DestinationRequest functions

/**
 * Add request
 * @param req
 * @param res
 * @param next
 */
exports.addRequest = function(req, res, next){
    if(!req.body.startLocation){
        logger.error('Error - Create request - Start location can\'t be empty');
        return next(error("BAD_REQUEST"));
    }

    if(!req.body.endLocation){
        logger.error('Error - Create request - End location can\'t be empty');
        return next(error("BAD_REQUEST"));
    }

    if(!req.params.userId){
        logger.error('Error - Create request - User id can\'t be empty');
        return next(error("BAD_REQUEST"));
    }

    userModel.findById(req.params.userId).then(function(found){
        if(!found) return next(error("NOT_FOUND"));

        destinationRequestModel.add(req.params.userId, req.body).then(function(destinationRequest){
            res.json(destinationRequest);
        }).fail(function(err){
            return next(err);
        });
    }).fail(function(err){
        return next(err);
    });
}

/**
 * User requests
 * @param req
 * @param res
 * @param next
 */
exports.userRequests = function(req, res, next){
    if(!req.params.userId){
        logger.error('Error - Get user requests - User id can\'t be empty');
        return next(error("BAD_REQUEST"));
    }

    userModel.findById(req.params.userId).then(function(found){
        if(!found) return next(error("NOT_FOUND"));

        destinationRequestModel.findByUserId(req.params.userId).then(function(requests){
            res.json(requests);
        }).fail(function(err){
            return next(err);
        });
    }).fail(function(err){
        return next(err);
    });
}