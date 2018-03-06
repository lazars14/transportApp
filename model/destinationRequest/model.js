var
  Q             = require("q"),
  DestinationRequestSchema = require('./schema.js'),
  mongoose      = require('mongoose'),
  constants = require('../../lib/constants');

/**
 * find by id
 * @param id
 * @returns {*}
 */
function _findById(id){
    var deffered = Q.defer();

    model.findOne({"_id" : mongoose.Types.ObjectId(id)}, function(err, data){
        if(err){
            logger.error('Database error - ' + JSON.stringify(err) + ' while trying to find destination request with id ' + id);
            return deffered.reject(error("MONGO_ERROR"));
        };
        deffered.resolve(data);
    });

    return deffered.promise;
}

/**
 * find by status
 * @param status
 * @returns {*}
 */
function _findByStatus(status){
    var deffered = Q.defer();

    model.findOne({status : status}, function(err, data){
        if(err){
            logger.error('Database error - ' + JSON.stringify(err) + ' while trying to find destination request with status ' + status);
            return deffered.reject(error("MONGO_ERROR"));
        };
        deffered.resolve(data);
    });

    return deffered.promise;
}

/**
 * find by destination id
 * @param destinationId
 * @returns {*}
 */
function _findByDestinationId(destinationId){
    var deffered = Q.defer();

    model.findOne({destinationId : destinationId}, function(err, data){
        if(err){
            logger.error('Database error - ' + JSON.stringify(err) + ' while trying to find destination request with destination id ' + destinationId);
            return deffered.reject(error("MONGO_ERROR"));
        };
        deffered.resolve(data);
    });

    return deffered.promise;
}

/**
 * find by user id
 * @param userId
 * @returns {*}
 */
function _findByUserId(userId){
    var deffered = Q.defer();

    model.findOne({userId : userId}, function(err, data){
        if(err){
            logger.error('Database error - ' + JSON.stringify(err) + ' while trying to find destination request with user id ' + userId);
            return deffered.reject(error("MONGO_ERROR"));
        };
        deffered.resolve(data);
    });

    return deffered.promise;
}

/**
 * Find by id
 * @param id
 * @returns {*}
 */
DestinationRequestSchema.statics.findById = function(id){
    return _findById(id);
}

/**
 * Find by status
 * @param status
 * @returns {*}
 */
DestinationRequestSchema.statics.findByStatus = function(status){
    return _findByStatus(status);
}

/**
 * Find by destination id
 * @param destinationId
 * @returns {*}
 */
DestinationRequestSchema.statics.findByDestinationId = function(destinationId){
    return _findByDestinationId(destinationId);
}

/**
 * Find by user id
 * @param userId
 * @returns {*}
 */
DestinationRequestSchema.statics.findByUserId = function(userId){
    return _findByUserId(userId);
}

/**
 * DestinationRequest find all
 * @returns {*}
 */
DestinationRequestSchema.statics.findAll = function(){
    var deffered = Q.defer();

    model.find({}, function(err, data){
        if(err){
            logger.error('Database error - ' + JSON.stringify(err) + ' while trying to find all destination requests');
            return deffered.reject(error("MONGO_ERROR"));
        };
        return deffered.resolve(data);
    });

    return deffered.promise;
}

/**
 * find all submitted
 * @returns {*}
 */
function _findAllSubmitted(){
    var deffered = Q.defer();

    model.findOne({status : constants.status.SUBMITTED}, function(err, data){
        if(err){
            logger.error('Database error - ' + JSON.stringify(err) + ' while trying to find destination request with user id ' + userId);
            return deffered.reject(error("MONGO_ERROR"));
        };
        deffered.resolve(data);
    });

    return deffered.promise;
}

/**
 * Find all submitted
 * @returns {*}
 */
DestinationRequestSchema.statics.findAllSubmitted = function(){
    return _findAllSubmitted();
}

/**
 * DestinationRequest add
 * @param userId
 * @param destinationRequest
 * @returns {*}
 */
DestinationRequestSchema.statics.add = function(userId, destinationRequest){
    var deffered = Q.defer();

    destinationRequest.userId = userId;
    destinationRequest = new model(destinationRequest);

    destinationRequest.save(function(err, data){
        if(err){
            logger.error('Database error - ' + JSON.stringify(err) + ' while trying to add destination request');
            return deffered.reject(error("MONGO_ERROR"));
        };
        return deffered.resolve(data);
    });

    return deffered.promise;
}

/**
 * DestinationRequest update
 * @param id
 * @param data
 * @returns {*}
 */
DestinationRequestSchema.statics.update = function(id, data){
    var deffered = Q.defer();

    _findById(id).then(function(found){
        if(!found) return deffered.reject(error("NOT_FOUND"));
 
        if(data.startLocation) found.startLocation = data.startLocation;
        if(data.endLocation) found.endLocation = data.endLocation;
        if(data.startDate) found.startDate = data.startDate;
        if(data.endDate) found.endDate = data.endDate;
        if(data.price) found.price = data.price;
        if(data.status) found.status = data.status;
        if(data.destinationId) found.destinationId = data.destinationId;
        if(data.submissionDate) found.submissionDate = data.submissionDate;
        if(data.confirmationRequestDate) found.confirmationRequestDate = data.confirmationRequestDate;
        if(data.userId) found.userId = data.userId;

        found.save(function(err, destinationRequest){
            if(err){
                logger.error('Database error - ' + JSON.stringify(err) + ' while trying to update destination request with id ' + id);
                return deffered.reject(error("MONGO_ERROR"));
            };
            return deffered.resolve(destinationRequest);
        });

    }).fail(function(err){
        deffered.reject(err);
    });

    return deffered.promise;
}

/**
 * Delete DestinationRequest
 * @param id
 * @returns {*}
 */
DestinationRequestSchema.statics.delete = function(id){
    var deffered = Q.defer();

    _findById(id).then(function(found){
        if(!found) return deffered.reject(error("NOT_FOUND"));

        model.remove(function(err){
            if(err){
                logger.error('Database error - ' + JSON.stringify(err) + ' while trying to delete destination request with id ' + id);
                return deffered.reject(error("MONGO_ERROR"));
            }
            return deffered.resolve();
        });

    }).fail(function(err){
        deffered.reject(err);
    });

    return deffered.promise;
}

/**
 * DestinationRequest set to awaiting confirmation
 * @param id
 * @param data
 * @returns {*}
 */
DestinationRequestSchema.statics.changeToAwaiting = function(id, data){
    var deffered = Q.defer();

    _findById(id).then(function(found){
        if(!found) return deffered.reject(error("NOT_FOUND"));
 
        if(found.status != constants.status.SUBMITTED) return deffered.reject(error('NOT_ALLOWED'));

        found.status = constants.status.WAITING_FOR_CONFIRMATION;
        found.startDate = data.startDate;
        found.endDate = data.endDate;
        found.destinationId = data.destinationId;

        found.save(function(err, destinationRequest){
            if(err){
                logger.error('Database error - ' + JSON.stringify(err) + ' while trying to update destination request with id ' + id);
                return deffered.reject(error("MONGO_ERROR"));
            };
            return deffered.resolve(destinationRequest);
        });

    }).fail(function(err){
        deffered.reject(err);
    });

    return deffered.promise;
}

/**
 * DestinationRequest set to accepted
 * @param id
 * @returns {*}
 */
DestinationRequestSchema.statics.changeToAccepted = function(id){
    var deffered = Q.defer();

    _findById(id).then(function(found){
        if(!found) return deffered.reject(error("NOT_FOUND"));

        if(found.status != constants.status.WAITING_FOR_CONFIRMATION) return deffered.reject(error('NOT_ALLOWED'));

        found.status = constants.status.ACCEPTED;

        found.save(function(err, destinationRequest){
            if(err){
                logger.error('Database error - ' + JSON.stringify(err) + ' while trying to update destination request with id ' + id);
                return deffered.reject(error("MONGO_ERROR"));
            };
            return deffered.resolve(destinationRequest);
        });

    }).fail(function(err){
        deffered.reject(err);
    });

    return deffered.promise;
}

/**
 * DestinationRequest set to rejected
 * @param id
 * @returns {*}
 */
DestinationRequestSchema.statics.changeToRejected = function(id){
    var deffered = Q.defer();

    _findById(id).then(function(found){
        if(!found) return deffered.reject(error("NOT_FOUND"));
 
        found.status = constants.status.REJECTED;

        found.save(function(err, destinationRequest){
            if(err){
                logger.error('Database error - ' + JSON.stringify(err) + ' while trying to update destination request with id ' + id);
                return deffered.reject(error("MONGO_ERROR"));
            };
            return deffered.resolve(destinationRequest);
        });

    }).fail(function(err){
        deffered.reject(err);
    });

    return deffered.promise;
}


var model = mongoose.model('destinationRequests', DestinationRequestSchema);

module.exports = model;



