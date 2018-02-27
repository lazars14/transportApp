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

/**
 * Login user
 * @param req
 * @param res
 * @param next
 */
exports.loginUser = function(req, res, next){
    if(!req.body.email){
        logger.error('Error - Login user - Email can\'t be empty');
        return next(error("BAD_REQUEST"));
    }

    if(!isEmail(req.body.email)){
        logger.error('Error - Login user - Wrong email format');
        return next(error("BAD_REQUEST"));
    }

    if(!req.body.password){
        logger.error('Error - Login user - Password can\'t be empty');
        return next(error("BAD_REQUEST"));
    }

    userModel.login(req.body).then(function(data){
        res.json(data);
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

/**
 * Change user password
 * @param req
 * @param res
 * @param next
 */
exports.changeUserPassword = function(req, res, next){
    if(!req.body.oldPassword){
        logger.error('Error - Change user password - Old password can\'t be empty');
        return next(error("BAD_REQUEST"));
    }

    if(!req.body.newPassword){
        logger.error('Error - Change user password - New password can\'t be empty');
        return next(error("BAD_REQUEST"));
    }

    if(!req.body.repeatPassword){
        logger.error('Error - Change user password - Repeat password can\'t be empty');
        return next(error("BAD_REQUEST"));
    }

    if(!req.body.newPassword != !req.body.repeatPassword){
        logger.error('Error - Change user password - New and repeated password don\'t match');
        return next(error("NOT_ALLOWED"));
    }

    userModel.changeUserPassword(req.params.userId, req.body).then(function(user){
        res.json();
    }).fail(function(err){
        return next(err);
    });
}

/**
 * Change user email
 * @param req
 * @param res
 * @param next
 */
exports.changeUserEmail = function(req, res, next){
    if(!req.body.oldEmail){
        logger.error('Error - Change user email - Old email can\'t be empty');
        return next(error("BAD_REQUEST"));
    }

    if(!req.body.newEmail){
        logger.error('Error - Change user email - New email can\'t be empty');
        return next(error("BAD_REQUEST"));
    }

    userModel.changeUserEmail(req.params.userId, req.body).then(function(user){
        res.json();
    }).fail(function(err){
        return next(err);
    });
}