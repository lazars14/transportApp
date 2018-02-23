var vehicleModel = require('../../model/vehicle/model');
var driverModel = require('../../model/driver/model');
var managerModel = require('../../model/manager/model');
var clientModel = require('../../model/client/model');

var isEmail = require('validator/lib/isEmail');
var logger = require('../../lib/logger');

// Client functions

/**
 * Client Login
 * @param req
 * @param res
 * @param next
 */
exports.loginClient = function(req, res, next){
    if(!req.body.email){
        logger.error('Error - Client login - Email can\'t be empty');
        return next(error("BAD_REQUEST"));
    }

    if(!isEmail(req.body.email)){
        logger.error('Error - Client login - Wrong email format');
        return next(error("BAD_REQUEST"));
    }

    if(!req.body.password){
        logger.error('Error - Client login - Password can\'t be empty');
        return next(error("BAD_REQUEST"));
    }

    clientModel.login(req.body).then(function(data){
        res.json(data);
    }).fail(function(err){
        return next(err);
    });
}

/**
 * Update client
 * @param req
 * @param res
 * @param next
 */
exports.updateClient = function(req, res, next){
    if(!req.params.clientId){
        logger.error('Error - Client update - ClientId can\'t be empty');
        return next(error("BAD_REQUEST"));    
    }

    clientModel.update(req.params.clientId, req.body).then(function(client){
        res.json(client);
    }).fail(function(err){
        return next(err);
    });
}

// Manager functions

/**
 * Find all managers
 * @param req
 * @param res
 * @param next
 */
exports.getAllManagers = function(req, res, next){
    managerModel.getAll().then(function(managers){
        res.json(managers);
    }).fail(function(err){
        return next(err);
    });
}


// /**
//  * Find manager by Id
//  * @param req
//  * @param res
//  * @param next
//  */
// exports.findManagerById = function(req, res, next){
//     if(!req.params.managerId){
//         logger.error('Error - Find manager by id - ManagerId can\'t be empty');
//         return next(error("BAD_REQUEST"));
//     }

//     managerModel.findById(req.params.managerId).then(function(manager){
//         res.json(manager);
//     }).fail(function(err){
//         return next(err);
//     });
// }

/**
 * Register new manager
 * @param req
 * @param res
 * @param next
 */
exports.registerManager = function(req, res, next){
    if(!req.body.email){
        logger.error('Error - Manager register - Email can\'t be empty');
        return next(error("BAD_REQUEST"));
    }

    if(!isEmail(req.body.email)){
        logger.error('Error - Manager register - Wrong email format');
        return next(error("BAD_REQUEST"));
    }

    if(!req.body.password){
        logger.error('Error - Manager register - Password can\'t be empty');
        return next(error("BAD_REQUEST"));
    }

    managerModel.register(req.body).then(function(manager){
        res.json(manager);
    }).fail(function(err){
        return next(err);
    })
}

/**
 * Update manager
 * @param req
 * @param res
 * @param next
 */
exports.updateManager = function(req, res, next){
    if(!req.params.managerId){
        logger.error('Error - Manager delete - ManagerId can\'t be empty');
        return next(error("BAD_REQUEST"));    
    }

    managerModel.update(req.params.managerId, req.body).then(function(manager){
        res.json(manager);
    }).fail(function(err){
        return next(err);
    });
}

/**
 * Delete manager
 * @param req
 * @param res
 * @param next
 */
exports.deleteManager = function(req, res, next){
    if(!req.params.managerId){
        logger.error('Error - Manager delete - ManagerId can\'t be empty');
        return next(error("BAD_REQUEST"));    
    }

    managerModel.remove(req.params.managerId).then(function(){
        res.json();
    }).fail(function(err){
        return next(err);
    })
}

// Vehicle functions

/**
 * Find all vehicles
 * @param req
 * @param res
 * @param next
 */
exports.getAllVehicles = function(req, res, next){
    vehicleModel.findAll().then(function(vehicles){
        res.json(vehicles);
    }).fail(function(err){
        return next(err);
    });
}

/**
 * Find vehicle by id
 * @param req
 * @param res
 * @param next
 */
exports.getVehicleById = function(req, res, next){
    if(!req.params.vehicleId){
        logger.error('Error - Find vehicle by id - VehicleId can\'t be empty');
        return next(error("BAD_REQUEST"));
    }

    vehicleModel.findById(req.params.vehicleId).then(function(vehicle){
        res.json(vehicle);
    }).fail(function(err){
        return next(err);
    });
}

/**
 * Add vehicle
 * @param req
 * @param res
 * @param next
 */
exports.addVehicle = function(req, res, next){
    if(!req.licensePlate){
        logger.error('Error - Add vehicle - License plate can\'t be empty');
        return next(error("BAD_REQUEST"));
    }

    if(!req.licenseExpireDate){
        logger.error('Error - Add vehicle - License expire date can\'t be empty');
        return next(error("BAD_REQUEST"));
    }
    
    if(!req.numberOfSeats){
        logger.error('Error - Add vehicle - Number of seats can\'t be empty');
        return next(error("BAD_REQUEST"));
    }

    vehicleModel.add(req.body).then(function(vehicle){
        res.json(vehicle);
    }).fail(function(err){
        return next(err);
    });
}

/**
 * Update vehicle
 * @param req
 * @param res
 * @param next
 */
exports.updateVehicle = function(req, res, next){
    if(!req.params.vehicleId){
        logger.error('Error - Update vehicle - VehicleId can\'t be empty');
        return next(error("BAD_REQUEST"));
    }

    vehicleModel.update(req.params.vehicleId, req.body).then(function(vehicle){
        res.json(vehicle);
    }).fail(function(err){
        return next(err);
    });
}

/**
 * Remove vehicle
 * @param req
 * @param res
 * @param next
 */
exports.removeVehicle = function(req, res, next){
    if(!req.params.vehicleId){
        logger.error('Error - Remove vehicle - VehicleId can\'t be empty');
        return next(error("BAD_REQUEST"));
    }

    vehicleModel.remove(req.params.vehicleId).then(function(){
        res.json();
    }).fail(function(err){
        return next(err);
    });
}

// /**
//  * Increase vehicle kms
//  * @param req
//  * @param res
//  * @param next
//  */
// exports.increaseVehiclekms = function(req, res, next){
//     if(!req.body.vehicleId){
//         logger.error('Error - Increase vehicle kms - VehicleId can\'t be empty');
//         return next(error("BAD_REQUEST"));
//     }

//     if(!req.body.numberOfKms){
//         logger.error('Error - Increase vehicle kms - NumberOfKms can\'t be empty');
//         return next(error("BAD_REQUEST"));
//     }

//     vehicleModel.increaseKms(req.body.vehicleId, req.body.numberOfKms).then(function(vehicle){
//         res.json(vehicle);
//     }).fail(function(err){
//         return next(err);
//     });
// }


// Driver functions

/**
 * Find all drivers
 * @param req
 * @param res
 * @param next 
 */
exports.findAllDrivers = function(req, res, next){
    driverModel.findAll().then(function(drivers){
        res.json(drivers);
    }).fail(function(err){
        return next(err);
    });
}

/**
 * Find driver by id
 * @param req
 * @param res
 * @param next
 */
exports.findDriverById = function(req, res, next){
    if(!req.params.driverId){
        logger.error('Error - Find driver by id - DriverId can\'t be empty');
        return next(error("BAD_REQUEST"));
    }

    driverModel.findById(req.params.driverId).then(function(driver){
        res.json(driver);
    }).fail(function(err){
        return next(err);
    });
}

/**
 * Add driver
 * @param req
 * @param res
 * @param next
 */
exports.addDriver = function(req, res, next){
    if(!req.body.email){
        logger.error('Error - Add driver - Email can\'t be empty');
        return next(error("BAD_REQUEST"));
    }
    if(!isEmail(req.body.email)){
        logger.error('Error - Add driver - Wrong email format');
        return next(error("BAD_REQUEST"));
    }
    if(!req.body.firstName){
        logger.error('Error - Add driver - Firstname can\'t be empty');
        return next(error("BAD_REQUEST"));
    }
    if(!req.body.lastName){
        logger.error('Error - Add driver - Lastname can\'t be empty');
        return next(error("BAD_REQUEST"));
    }

    driverModel.add(req.body).then(function(driver){
        res.json(driver);
    }).fail(function(err){
        return next(err);
    });
}

/**
 * Update driver
 * @param req
 * @param res
 * @param next
 */
exports.updateDriver = function(req, res, next){
    if(!req.params.driverId){
        logger.error('Error - Update driver - DriverId can\'t be empty');
        return next(error("BAD_REQUEST"));
    }
    
    driverModel.update(req.params.driverId, req.body).then(function(driver){
        res.json(driver);
    }).fail(function(err){
        return next(err);
    });
}

/**
 * Remove driver
 * @param req
 * @param res
 * @param next
 */
exports.removeDriver = function(req, res, next){
    if(!req.params.driverId){
        logger.error('Error - Remove driver - DriverId can\'t be empty');
        return next(error("BAD_REQUEST"));
    }

    driverModel.remove(req.params.driverId).then(function(){
        res.json();
    }).fail(function(err){
        return next(err);
    });
}





