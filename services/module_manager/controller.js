var expenseModel = require('../../model/vehicleExpense/model');
var vehicleModel = require('../../model/vehicle/model');
var managerModel = require('../../model/manager/model');
var userModel = require('../../model/user/model');
var destinationModel = require('../../model/destination/model');

var isEmail = require('validator/lib/isEmail');

// Manager functions

/**
 * Manager Login
 * @param req
 * @param res
 * @param next
 */
exports.loginManager = function(req, res, next){
    if(!req.body.email){
        logger.error('Error - Manager login - Email can\'t be empty');
        return next(error("BAD_REQUEST"));
    }

    if(!isEmail(req.body.email)){
        logger.error('Error - Manager login - Wrong email format');
        return next(error("BAD_REQUEST"));
    }

    if(!req.body.password){
        logger.error('Error - Manager login - Password can\'t be empty');
        return next(error("BAD_REQUEST"));
    }

    managerModel.login(req.body).then(function(data){
        res.json(data);
    }).fail(function(err){
        return next(err);
    });
}


// Vehicle expenses functions

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
 * Find all expenses for vehicle
 * @param req
 * @param res
 * @param next
 */
exports.getExpensesForVehicle = function(req, res, next){
        vehicleModel.findById(req.params.vehicleId).then(function(vehicle){
            if (!vehicle) return next(error("NOT_FOUND"));

            expenseModel.findExpensesForVehicle(req.params.vehicleId).then(function (expenses) {
                res.json(expenses);
            }).fail(function (err) {
                return next(err);
            });
    }).fail(function(err){
        return next(err);
    });
}

/**
 * Find expense by id
 * @param req
 * @param res
 * @param next
 */
exports.getExpenseById = function(req, res, next){
    vehicleModel.findById(req.params.vehicleId).then(function(vehicle){
        if(!vehicle) return next(error("NOT_FOUND"));

        expenseModel.findById(req.params.vehicleExpenseId).then(function(expense){
            if(!expense) return next(error("NOT_FOUND"));
            res.json(expense);
        }).fail(function(err){
            return next(err);
        })
    }).fail(function(err){
        return next(err);
    });
}

 /**
 * Add expense
 * @param req
 * @param res
 * @param next
 */
exports.addExpense = function(req, res, next){
    vehicleModel.findById(req.params.vehicleId).then(function(vehicle){
        if(!vehicle) return next(error("NOT_FOUND"));

        expenseModel.add(req.params.vehicleId, req.body).then(function(expense){
            res.json(expense);
        }).fail(function(err){
            return next(err);
        })
    }).fail(function(err){
        return next(err);
    });
}

 /**
 * Update expense
 * @param req
 * @param res
 * @param next
 */
exports.updateExpense = function(req, res, next){
    vehicleModel.findById(req.params.vehicleId).then(function(vehicle){
        if(!vehicle) return next(error("NOT_FOUND"));

        expenseModel.update(req.params.vehicleExpenseId, req.body).then(function(expense){
            if(!expense) return next(error("NOT_FOUND"));
            res.json(expense);
        }).fail(function(err){
            return next(err);
        })
    }).fail(function(err){
        return next(err);
    });
}

 /**
 * Delete expense
 * @param req
 * @param res
 * @param next
 */
exports.deleteExpense = function(req, res, next){
    vehicleModel.findById(req.params.vehicleId).then(function(vehicle){
        if(!vehicle) return next(error("NOT_FOUND"));

        expenseModel.delete(req.params.vehicleExpenseId).then(function(){
            res.json();
        }).fail(function(err){
            return next(err);
        })
    }).fail(function(err){
        return next(err);
    });
}

/**
 * Extend vehicle registration
 * @param req
 * @param res
 * @param next
 */
exports.extendVehicleRegistration = function(req, res, next){
    if(!req.body.licensePlate){
        logger.error('Error - Extend vehicle registration - License plate can\'t be empty');
        return next(error("BAD_REQUEST"));
    }

    if(!req.body.licenseExpireDate){
        logger.error('Error - Extend vehicle registration - License expire date can\'t be empty');
        return next(error("BAD_REQUEST"));
    }

    vehicleModel.extendRegistration(req.params.vehicleId, req.body).then(function(vehicle){
        res.json();
    }).fail(function(err){
        return next(err);
    });
}

/**
 * Get all users
 * @param req
 * @param res
 * @param next
 */
exports.findAllUsers = function(req, res, next){
    userModel.findAll().then(function(users){
        res.json();
    }).fail(function(err){
        return next(err);
    })
}

/**
 * Delete user by id
 * @param req
 * @param res
 * @param next
 */
exports.deleteUser = function(req, res, next){
    userModel.delete(req.params.userId).then(function(){
        res.json();
    }).fail(function(err){
        return next(err);
    });
}

/**
 * Find all destinations for manager
 * @param req
 * @param res
 * @param next
 */
exports.findDestinationsByManagerId = function(req, res, next){
    destinationModel.findByManagerId(req.params.managerId).then(function(destinations){
        res.json(destinations);
    }).fail(function(err){
        return next(err);
    })
}

/**
 * Find all destinations not for manager
 * @param req
 * @param res
 * @param next
 */
exports.findDestinationsByManagerIdNot = function(req, res, next){
    destinationModel.findByManagerIdNot(req.params.managerId).then(function(destinations){
        res.json(destinations);
    }).fail(function(err){
        return next(err);
    })
}

/**
 * Find destination by id
 * @param req
 * @param res
 * @param next
 */

exports.findDestinationById = function(req, res, next){
    destinationModel.findById(req.params.destinationId).then(function(destination){
        if(!destination) return next(error('NOT_FOUND'));
        res.json(destination);
    }).fail(function(err){
        return next(err);
    })
}

/**
 * Add destination
 * @param req
 * @param res
 * @param next
 */
exports.addDestination = function(req, res, next){
    if(!req.body.startLocation){
        logger.error('Error - Add destination - Start location can\'t be empty');
        return next(error('BAD_REQUEST'));
    }

    if(!req.body.endLocation){
        logger.error('Error - Add destination - End location can\'t be empty');
        return next(error('BAD_REQUEST'));
    }

    destinationModel.add(req.params.managerId, req.body).then(function(destination){
        res.json(destination);
    }).fail(function(err){
        return next(err);
    })
}

/**
 * Update destination
 * @param req
 * @param res
 * @param next
 */
exports.updateDestination = function(req, res, next){
    if(!req.body.destinationManagerId){
        logger.error('Error - Update destination - DestinationManagerId can\'t be empty');
        return next(error('BAD_REQUEST'));
    }
    
    if(req.params.managerId != req.body.destinationManagerId){
        logger.error('Error - Update destination - Can\'t update destination from another manager');
        return next(error('NOT_ALLOWED'));
    }

    destinationModel.update(req.params.destinationId, req.body).then(function(destination){
        res.json(destination);
    }).fail(function(err){
        return next(err);
    });
}

/**
 * Delete destination
 * @param req
 * @param res
 * @param next
 */
exports.deleteDestination = function(req, res, next){
    if(!req.body.destinationManagerId){
        logger.error('Error - Delete destination - DestinationManagerId can\'t be empty');
        return next(error('BAD_REQUEST'));
    }
    
    if(req.params.managerId != req.body.destinationManagerId){
        logger.error('Error - Delete destination - Can\'t delete destination from another manager');
        return next(error('NOT_ALLOWED'));
    }

    destinationModel.delete(req.params.destinationId).then(function(destination){
        res.json(destination);
    }).fail(function(err){
        return next(err);
    });
}

/**
 * Set destination vehicle
 * @param req
 * @param res
 * @param next
 */
exports.setDestinationVehicle = function(req, res, next){
    if(!req.body.destinationManagerId){
        logger.error('Error - Set destination vehicle - DestinationManagerId can\'t be empty');
        return next(error('BAD_REQUEST'));
    }
    
    if(req.params.managerId != req.body.destinationManagerId){
        logger.error('Error - Set destination vehicle - Can\'t update destination from another manager');
        return next(error('NOT_ALLOWED'));
    }

    if(!req.body.vehicleId){
        logger.error('Error - Set destination vehicle - VehicleId can\'t be empty');
        return next(error('BAD_REQUEST'));
    }

    if(!req.body.startDate){
        logger.error('Error - Set destination vehicle - StartDate can\'t be empty');
        return next(error('BAD_REQUEST'));
    }

    if(!req.body.endDate){
        logger.error('Error - Set destination vehicle - EndDate can\'t be empty');
        return next(error('BAD_REQUEST'));
    }

    destinationModel.checkDestinationsForVehicle(req.body.vehicleId, req.body.startDate, req.body.endDate).then(function(destinations){
        if(destinations[0]) return next(error('NOT_ALLOWED'));

        destinationModel.setVehicle(req.params.destinationId, req.body.vehicleId).then(function(destination){
            res.json(destination);
        }).fail(function(err){
            return next(err);
        });
    })

}

/**
 * Set destination drivers
 * @param req
 * @param res
 * @param next
 */
exports.setDestinationDrivers = function(req, res, next){
    if(!req.body.destinationManagerId){
        logger.error('Error - Set destination vehicle - DestinationManagerId can\'t be empty');
        return next(error('BAD_REQUEST'));
    }

    if(req.params.managerId != req.body.destinationManagerId){
        logger.error('Error - Set destination drivers - Can\'t update destination from another manager');
        return next(error('NOT_ALLOWED'));
    }

    if(!req.body.drivers){
        logger.error('Error - Set destination drivers - Drivers can\'t be empty');
        return next(error('BAD_REQUEST'));
    }

    if(!req.body.startDate){
        logger.error('Error - Set destination drivers - StartDate can\'t be empty');
        return next(error('BAD_REQUEST'));
    }

    if(!req.body.endDate){
        logger.error('Error - Set destination drivers - EndDate can\'t be empty');
        return next(error('BAD_REQUEST'));
    }

    // check if the drivers are available
    // if not return not allowed

    destinationModel.setDrivers(req.params.managerId, req.body.drivers).then(function(destination){
        res.json(destination);
    }).fail(function(err){
        return next(err);
    });
}













