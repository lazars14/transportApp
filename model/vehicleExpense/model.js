var
  Q             = require("q"),
  VehicleExpenseSchema = require('./schema.js'),
  mongoose      = require('mongoose');

/**
 * find vehicleExpense by id
 * @param id
 * @returns {*}
 */
function _findById(id){
    var deffered = Q.defer();
    
    if(!id) return deffered.resolve(null);

    model.findOne({"_id" : mongoose.Types.ObjectId(id)}, function(err, expense){
        if(err){
            logger.error('Database error - ' + JSON.stringify(err) + ' while trying to find expense with id ' + id);
            return deffered.reject(error("MONGO_ERROR"));
        };
        deffered.resolve(expense);
    });

    return deffered.promise;
};

/**
 * Find vehicleExpense by id
 * @param id
 * @returns {*}
 */
VehicleExpenseSchema.statics.findById = function(id){
    return _findById(id);
};

/** 
 * Find all vehicleExpenses
 * @returns {*}
 */
VehicleExpenseSchema.statics.findAll = function(){
    var deffered = Q.defer();

    model.find({}, function(err, expenses){
        if(err){
            logger.error('Database error - ' + JSON.stringify(err) + ' while trying to find all expenses');
            return deffered.reject(error("MONGO_ERROR"));
        };
        return deffered.resolve(expenses);
    });

    return deffered.promise;
};

/** 
 * Find vehicleExpenses for vehicle
 * @param vehicleId
 * @returns {*}
 */
VehicleExpenseSchema.statics.findAll = function(vehicleId){
    var deffered = Q.defer();

    model.find({vehicleId : vehicleId}, function(err, expenses){
        if(err){
            logger.error('Database error - ' + JSON.stringify(err) + ' while trying to find all expenses for vehicle with id ' + vehicleId);
            return deffered.reject(error("MONGO_ERROR"));
        };
        return deffered.resolve(expenses);
    });

    return deffered.promise;
};

/**
 * Add vehicleExpense
 * @param vehicleExpense
 * @returns {*}
 */
VehicleExpenseSchema.statics.add = function(vehicleExpense){
    var deffered = Q.defer();

    _findById(vehicleExpense._id).then(function(found){
        found = new model(found);
        
        if(found) return deffered.reject(error("NOT_FOUND"));

        found.save(function(err, expense){
            if(err){
                logger.error('Database error - ' + JSON.stringify(err) + ' while trying to add expense');
                return deffered.reject(error("MONGO_ERROR"));
            };
            return deffered.resolve(vehicleExpense);
        });
        
    }).fail(function(err){
        deffered.reject(err);
    });

    return deffered.promise;
};

/**
 * Update vehicleExpense
 * @param id
 * @param data
 * @returns {*}
 */
VehicleExpenseSchema.statics.update = function(id, data){
    var deffered = Q.defer();

    _findById(id).then(function(found){
        if(!found) return deffered.reject(error("NOT_FOUND"));

        //name, amount, vehicleId
        if(data.name) found.name = data.name;
        if(data.amount) found.amount = data.amount;
        if(data.vehicleId) found.vehicleId = data.vehicleId; 

        found.save(function(err, expense){
            if(err){
                logger.error('Database error - ' + JSON.stringify(err) + ' while trying to update expense with id ' + id);
                return deffered.reject(error("MONGO_ERROR"));
            };
            return deffered.resolve(expense);
        });

    }).fail(function(err){
        deffered.reject(err);
    });

    return deffered.promise;
};

/**
 * Remove vehicleExpense
 * @param id
 * @returns {*}
 */
VehicleExpenseSchema.statics.remove = function(id){
    var deffered = Q.defer();

    _findById(id).then(function(found){
        if(!found) return deffered.reject(error("NOT_FOUND"));

        model.remove(function(err){
            if(err){
                logger.error('Database error - ' + JSON.stringify(err) + ' while trying to remove expense with id ' + id);
                return deffered.reject(error("MONGO_ERROR"));
            };
            return deffered.resolve();
        });
    }).fail(function(err){
        deffered.reject(err);
    });

    return deffered.promise;
};


var model = mongoose.model('vehicleExpense', VehicleExpenseSchema);

module.exports = model;


