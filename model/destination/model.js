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
 * Find destination by manager id
 * @param managerId
 * @returns {*}
 */
DestinationSchema.statics.findByManagerId = function(managerId){
    return _findByManagerId(managerId);
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
 * @param destination
 * @returns {*}
 */
DestinationSchema.statics.add = function(destination){
    var deffered = Q.defer();

    destination = new model(destination);

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
        if(data.vehicleId) found.vehicleId = data.vehicleId;
        if(data.managerId) found.managerId = data.managerId;
        if(data.drivers) found.drivers = data.drivers;

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
 * @return {*}
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

var model = mongoose.model('destination', DestinationSchema);

module.exports = model;