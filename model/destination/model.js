var
  Q             = require("q"),
  DestinationSchema = require('./schema.js'),
  mongoose      = require('mongoose');

/**
 * find destination by id
 * @param id
 * @returns {*}
 */
function _findById(id){
    var deffered = Q.defer();

    model.findOne({"_id" : mongoose.Types.ObjectId(id)}, function(err, destination){
        if(err){
            logger.error('Database error - ' + JSON.stringify(err) + ' while trying to find destination with id ' + id);
            return deffered.reject(error("MONGO_ERROR"));
        };
        deffered.resolve(destination);
    });

    return deffered.promise;
}

/**
 * find destinations by manager id
 * @param managerId
 * @returns {*}
 */
function _findByManagerId(managerId){
    var deffered = Q.defer();

    model.find({managerId : managerId}, function(err, destinations){
        if(err){
            logger.error('Database error - ' + JSON.stringify(err) + ' while trying to find destinations for manager id ' + managerId);
            return deffered.reject(error("MONGO_ERROR"));
        };
        deffered.resolve(destinations);
    });

    return deffered.promise;
}

/**
 * find destinations by manager id
 * @param managerId
 * @returns {*}
 */
function _findByManagerIdNot(managerId){
    var deffered = Q.defer();

    model.find({managerId: {'$ne': managerId }}, function(err, destinations){
        if(err){
            logger.error('Database error - ' + JSON.stringify(err) + ' while trying to find destinations not for manager id ' + managerId);
            return deffered.reject(error("MONGO_ERROR"));
        };
        deffered.resolve(destinations);
    });

    return deffered.promise;
}

/**
 * find destinations by vehicle id
 * @param vehicleId
 * @returns {*}
 */
function _findByVehicleId(vehicleId){
    var deffered = Q.defer();

    model.find({vehicleId : vehicleId}, function(err, destinations){
        if(err){
            logger.error('Database error - ' + JSON.stringify(err) + ' while trying to find destinations with vehicleId ' + vehicleId);
            return deffered.reject(error("MONGO_ERROR"));
        };
        deffered.resolve(destinations);
    });

    return deffered.promise;
}

/**
 * Find destination by id
 * @param id
 * @returns {*}
 */
DestinationSchema.statics.findById = function(id){
    return _findById(id);
}

/**
 * Find destinations by manager id
 * @param managerId
 * @returns {*}
 */
DestinationSchema.statics.findByManagerId = function(managerId){
    return _findByManagerId(managerId);
}

/**
 * Find destinations by not manager id
 * @param managerId
 * @returns {*}
 */
DestinationSchema.statics.findByManagerIdNot = function(managerId){
    return _findByManagerIdNot(managerId);
}

/**
 * Find destination by vehicle id
 * @param vehicleId
 * @returns {*}
 */
DestinationSchema.statics.findByVehicleId = function(vehicleId){
    return _findByVehicleId(vehicleId);
}

/**
 * Find all destinations
 * @returns {*}
 */
DestinationSchema.statics.findAll = function(){
    var deffered = Q.defer();

    model.find({}, function(err, data){
        if(err){
            logger.error('Database error - ' + JSON.stringify(err) + ' while trying to find all destinations' + driverId);
            return deffered.reject("MONGO_ERROR");
        };
        return deffered.resolve(data);
    });

    return deffered.promise;
} 

/**
 * Add destination
 * @param managerId
 * @param destination
 * @returns {*}
 */
DestinationSchema.statics.add = function(managerId, destination){
    var deffered = Q.defer();

    destination = new model(destination);
    destination.managerId = managerId;

    destination.save(function(err, data){
        if(err){
            logger.error('Database error - ' + JSON.stringify(err) + ' while trying to add destination');
            return deffered.reject(error("MONGO_ERROR"));
        };
        return deffered.resolve(data);
    });

    return deffered.promise;
}

/**
 * Update destination
 * @param id
 * @param data
 * @returns {*}
 */
DestinationSchema.statics.update = function(id, data){
    var deffered = Q.defer();
    
    _findById(id).then(function(found){
        if(!found) return deffered.reject(error("NOT_FOUND"));

        if(data.startLocation) found.startLocation = data.startLocation;
        if(data.endLocation) found.endLocation = data.endLocation;
        if(data.startDate) found.startDate = data.startDate;
        if(data.endDate) found.endDate = data.endDate;
        if(data.driversPay) found.driversPay = data.driversPay;
        if(data.numberOfKms) found.numberOfKms = data.numberOfKms;
        if(data.fuelExpenses) found.fuelExpenses = data.fuelExpenses;

        found.save(function(err, destination){
            if(err){
                logger.error('Database error - ' + JSON.stringify(err) + ' while trying to update destination with id ' + id);
                return deffered.reject(error("MONGO_ERROR"));
            };
            return deffered.resolve(destination);
        });

    }).fail(function(err){
        deffered.reject(err);
    });

    return deffered.promise;
}

/**
 * Delete destination
 * @param id
 * @returns {*}
 */
DestinationSchema.statics.delete = function(id){
    var deffered = Q.defer();

    _findById(id).then(function(found){
        if(!found) return deffered.reject(error("NOT_FOUND"));

        model.remove(function(err){
            if(err){
                logger.error('Database error - ' + JSON.stringify(err) + ' while trying to delete destination with id ' + id);
                return deffered.reject(error("MONGO_ERROR"));
            };
            return deffered.resolve();
        });

    }).fail(function(err){
        deffered.reject(err);
    });

    return deffered.promise;
}

/**
 * check if driver is available
 * @param driverId
 * @param startDate
 * @param endDate
 * @returns {*}
 */
function _checkDestinationsForDriver(driverId, startDate, endDate){
    var deffered = Q.defer();

    model.find({drivers : {'$elemMatch' : {'_id' : driverId}}, startDate : { '$gte' : startDate}, endDate : { '$lte' : endDate}}, function(err, destinations){
        if(err){
            logger.error('Database error - ' + JSON.stringify(err) + ' while trying to check driver for destinations, driver id is ' + driverId);
            return deffered.reject(error('MONGO_ERROR'));
        }
        return deffered.resolve(destinations);
    });

    return deffered.promise;
}

/**
 * Check if driver is available
 * @param driverId
 * @param startDate
 * @param endDate
 * @returns {*}
 */
DestinationSchema.statics.checkDestinationsForDriver = function(driverId, startDate, endDate){
    return _checkDestinationsForDriver(driverId, startDate, endDate);
}

/**
 * Set destination drivers
 * @param id
 * @param drivers
 * @returns {*}
 */
DestinationSchema.statics.setDrivers = function(id, drivers){
    var deffered = Q.defer();

    _findById(id).then(function(found){
        if(!found) return deffered.reject(error("NOT_FOUND"));

        found.drivers = drivers;

        found.save(function(err, destination){
            if(err){
                logger.error('Database error - ' + JSON.stringify(err) + ' while trying to set destination drivers with id ' + id);
                return deffered.reject(error("MONGO_ERROR"));
            };
            return deffered.resolve(destination);
        });

    }).fail(function(err){
        deffered.reject(err);
    });

    return deffered.promise;
}

/**
 * check if vehicle is available
 * @param vehicleId
 * @param startDate
 * @param endDate
 * @returns {*}
 */
function _checkDestinationsForVehicle(vehicleId, startDate, endDate){
    var deffered = Q.defer();

    model.find({vehicleId : vehicleId, startDate : { '$gte' : startDate}, endDate : { '$lte' : endDate}}, function(err, destination){
        if(err){
            logger.error('Database error - ' + JSON.stringify(err) + ' while trying to check vehicle for destinations, vehicle id is ' + vehicleId);
            return deffered.reject(error('MONGO_ERROR'));
        }
        return deffered.resolve(destination);
    });

    return deffered.promise;
}

/**
 * Check if vehicle is available
 * @param vehicleId
 * @param startDate
 * @param endDate
 * @returns {*}
 */
DestinationSchema.statics.checkDestinationsForVehicle = function(vehicleId, startDate, endDate){
    return _checkDestinationsForVehicle(vehicleId, startDate, endDate);
}

/**
 * Set destination vehicle
 * @param id
 * @param vehicleId
 * @returns {*}
 */
DestinationSchema.statics.setVehicle = function(id, vehicleId){
    var deffered = Q.defer();

    _findById(id).then(function(found){
        if(!found) return deffered.reject(error("NOT_FOUND"));

        found.vehicleId = vehicleId;

        found.save(function(err, destination){
            if(err){
                logger.error('Database error - ' + JSON.stringify(err) + ' while trying to set destination vehicle with id ' + id);
                return deffered.reject(error("MONGO_ERROR"));
            };
            return deffered.resolve(destination);
        });

    }).fail(function(err){
        deffered.reject(err);
    });

    return deffered.promise;
}

var model = mongoose.model('destinations', DestinationSchema);

module.exports = model;