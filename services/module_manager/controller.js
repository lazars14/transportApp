var expenseModel = require('../../model/vehicleExpense/model');
var vehicleModel = require('../../model/vehicle/model');
var managerModel = require('../../model/manager/model');

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

        expenseModel.delete(req.params.vehicleExpenseId, req.body).then(function(){
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


