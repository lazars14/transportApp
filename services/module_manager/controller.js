var expenseModel = require('../../model/vehicleExpense/model');
var vehicleModel = require('../../model/vehicle/model')

var logger = require('../../lib/logger');

// Vehicle expenses functions

/**
 * Find all expenses
 * @param req
 * @param res
 * @param next
 */
exports.getAllExpenses = function(req, res, next){
    expenseModel.findAll().then(function(expenses){
        res.json(expenses);
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
    if(!req.params.vehicleId){
        logger.error('Error - Find expense by id - VehicleId can\'t be empty');
        return next(error("BAD_REQUEST"));
    }

    if(!req.params.vehicleExpenseId){
        logger.error('Error - Find expense by id - VehicleExpenseId can\'t be empty');
        return next(error("BAD_REQUEST"));
    }

    vehicleModel.findById(req.params.vehicleId).then(function(vehicle){
        if(!vehicle) return next(error("NOT_FOUND"));

        expenseModel.findById(req.params.vehicleExpenseId).then(function(expense){
            res.json(expense);
        }).fail(function(err){
            return next(err);
        })
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
    if(!req.params.vehicleId){
        logger.error('Error - Find expense for vehicle - VehicleId can\'t be empty');
        return next(error("BAD_REQUEST"));
    }

    vehicleModel.findById(req.params.vehicleId).then(function(vehicle){
        if(!vehicle) return next(error("NOT_FOUND"));

        expenseModel.findExpensesForVehicle(req.params.vehicleId).then(function(expenses){
            res.json(expenses);
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
    if(!req.params.vehicleId){
        logger.error('Error - Add expense for vehicle - VehicleId can\'t be empty');
        return next(error("BAD_REQUEST"));
    }

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
    if(!req.params.vehicleId){
        logger.error('Error - Update expense for vehicle - VehicleId can\'t be empty');
        return next(error("BAD_REQUEST"));
    }

    if(!req.params.vehicleId){
        logger.error('Error - Update expense for vehicle - VehicleId can\'t be empty');
        return next(error("BAD_REQUEST"));
    }

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
 * Remove expense
 * @param req
 * @param res
 * @param next
 */
exports.removeExpense = function(req, res, next){
    if(!req.params.vehicleId){
        logger.error('Error - Remove expense - VehicleId can\'t be empty');
        return next(error("BAD_REQUEST"));
    }

    if(!req.params.vehicleExpenseId){
        logger.error('Error - Remove expense - VehicleExpenseId can\'t be empty');
        return next(error("BAD_REQUEST"));
    }

    vehicleModel.update(req.params.vehicleExpenseId).then(function(vehicle){
        if(!vehicle) return next(error("NOT_FOUND"));

        expenseModel.remove(req.params.vehicleExpenseId).then(function(){
            res.json();
        }).fail(function(err){
            return next(err);
        })
    }).fail(function(err){
        return next(err);
    });
}



