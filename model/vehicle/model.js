var
  Q             = require("q"),
  VehicleSchema = require('./schema.js'),
  mongoose      = require('mongoose');

/**
 * find vehicle by license plate
 * @param licensePlate
 * @returns {*} 
 */
function _findVehicleByLicensePlate(licensePlate){
    var deffered = Q.defer();
    
    model.findOne({licensePlate : licensePlate}, function(err, data){
        if(err) return deffered.reject(error("MONGO_ERROR"));
        deffered.resolve(data);
    });

    return deffered.promise;
};

/**
 * find vehicle by id
 * @param id
 * @returns {*}
 */
function _findVehicleById(id){
    var deffered = Q.defer();

    if(!id) deffered.resolve(null);

    model.findOne({"_id" : mongoose.Types.ObjectId(id)}, function(err, data){
        if(err) return deffered.reject(error("MONGO_ERROR"));
        deffered.resolve(data);
    });

    return deffered.promise;
};

/**
 * Find vehicle by license plate
 * @param licensePlate
 * @returns {*}
 */
VehicleSchema.statics.getByLicensePlate = function(licensePlate){
    return _findVehicleByLicensePlate(licensePlate);
};

/**
 * Find vehicle by id
 * @param id
 * @returns {*}
 */
VehicleSchema.statics.findById = function(id){
    return _findVehicleById(id);
};

/**
 * Find all vehicles
 * @returns {*}
 */
VehicleSchema.statics.findAll = function(){
    var deffered = Q.defer();

    model.find({}, function(err, vehicles){
        if(err){
            logger.error('Database error - ' + JSON.stringify(err) + ' while trying to get all vehicles');
            return deffered.reject(error("MONGO_ERROR"));
        }
        return deffered.resolve(vehicles);
    });

    return deffered.promise;
};

/**
 * Add vehicle
 * @param vehicle
 * @returns {*}
 */
VehicleSchema.statics.add = function(vehicle){
    var deffered = Q.defer();

    vehicle = new model(vehicle);
    _findVehicleByLicensePlate(vehicle.licensePlate).then(function(found){
        if(found) return deffered.reject(error("ALREADY_REGISTERED"));

        vehicle.save(function(err, vehicle){
            if(err){
                logger.error('Database error - ' + JSON.stringify(err) + ' while trying to add new vehicle');
                return deffered.reject(error("MONGO_ERROR"));
            }
            return deffered.resolve(vehicle);
        });

    }).fail(function(err){
        deffered.reject(err);
    });
    
    return deffered.promise;
};

/**
 * Update vehicle
 * @param vehicleId
 * @param data
 * @returns {*}
 */
VehicleSchema.statics.update = function(vehicleId, data){
    var deffered = Q.defer();

    _findVehicleById(vehicleId).then(function(found){
        if(!found) return deffered.reject(error("NOT_FOUND"));
        
        if(data.name) found.name = data.name;
        if(data.model) found.model = data.model;
        if(data.numberOfSeats) found.numberOfSeats = data.numberOfSeats;
        if(data.productionYear) found.productionYear = data.productionYear;
        if(data.numberOfKmPassed) found.numberOfKmPassed = data.numberOfKmPassed;
        
        found.save(function(err, vehicle){
            if(err){
                logger.error('Database error - ' + JSON.stringify(err) + ' while trying to update vehicle with id ' + id);
                return deffered.reject(error("MONGO_ERROR"));
            }
            return deffered.resolve(vehicle);
        });

    }).fail(function(err){
        deffered.reject(err);
    });

    return deffered.promise;
};

/**
 * Remove vehicle
 * @param id
 * @returns {*}
 */
VehicleSchema.statics.remove = function(id){
    var deffered = Q.defer();

    _findVehicleById(id).then(function(found){
        if(!found) return deffered.reject(error("NOT_FOUND"));

        model.remove({"_id" : mongoose.Types.ObjectId(id)}, function(err){
            if(err){
                logger.error('Database error - ' + JSON.stringify(err) + ' while trying to remove vehicle with id ' + id);
                return deffered.reject(error("MONGO_ERROR"));
            };
            return deffered.resolve();
        });

    }).fail(function(err){
        deffered.reject(err);
    });

    return deffered.promise;
};

/**
 * Increase vehicle km passed
 * @param id
 * @param numberOfKmsToAdd
 * @returns {*}
 */
VehicleSchema.statics.increaseKms = function(id, numberOfKmsToAdd){
    var deffered = Q.defer();

    _findVehicleById(id).then(function(found){
        if(!found) return deffered.reject(error("NOT_FOUND"));

        found.numberOfKmPassed += numberOfKmsToAdd;

        found.save(function(err, vehicle){
            if(err){
                logger.error('Database error - ' + JSON.stringify(err) + ' while trying to add kms to vehicle with id ' + id);
                return deffered.reject(error("MONGO_ERROR"));
            };
            return deffered.resolve(vehicle);
        });
    }).fail(function(err){
        deffered.reject(err);
    });

    return deffered.promise;
};


var model = mongoose.model('vehicle', VehicleSchema);

module.exports = model;