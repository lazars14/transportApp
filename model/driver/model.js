var
  Q             = require("q"),
  DriverSchema = require('./schema.js'),
  mongoose      = require('mongoose');

/**
 * find driver by id
 * @param id
 * @returns {*}
 */
function _findById(id){
  var deffered = Q.defer();

  if(!id) return deffered.resolve(null);

  model.findOne({"_id" : mongoose.Types.ObjectId(id)}, function(err, driver) {
    if(err){
      logger.error('Database error - ' + JSON.stringify(err) + ' while trying to find driver with id ' + id);
      return deffered.reject(error("MONGO_ERROR"));
    };
    deffered.resolve(driver);
  });

  return deffered.promise;
}

/**
 * find driver by email
 * @param email
 * @returns {*}
 */
function _findByEmail(email){
  var deffered = Q.defer();

  model.findOne({email : email}, function(err, driver){
    if(err){
      logger.error('Database error - ' + JSON.stringify(err) + ' while trying to find driver with email ' + email);
      return deffered.reject(error("MONGO_ERROR"));
    };
    deffered.resolve(driver);
  });

  return deffered.promise;
}

/**
 * Find driver by email
 * @param email
 * @returns {*}
 */
DriverSchema.statics.getByEmail = function(email){
  return _findByEmail(email);
}

/**
 * Find driver by id
 * @param id
 * @returns {*}
 */
DriverSchema.statics.findById = function(id){
  return _findById(id);
}

/**
 * Find all drivers
 * @returns {*}
 */
DriverSchema.statics.findAll = function(){
  var deffered = Q.defer();

  model.find({}, function(err, drivers){
    if(err){
      logger.error('Database error - ' + JSON.stringify(err) + ' while trying to find all drivers');
      return deffered.reject(error("MONGO_ERROR"));
    };
    return deffered.resolve(drivers);
  });

  return deffered.promise;
}

/**
 * Add driver
 * @param driver
 * @returns {*}
 */
DriverSchema.statics.add = function(driver){
  var deffered = Q.defer();

  found = new model(found);

  _findByEmail(driver.email).then(function(found){
    if(found) return deffered.reject(error("ALREADY_REGISTERED"));

    found.save(function(err, driver){
      if(err){
        logger.error('Database error - ' + JSON.stringify(err) + ' while trying to add driver');
        return deffered.reject(error("MONGO_ERROR"));
      };
      return deffered.resolve(driver);
    });

  }).fail(function(err){
    deffered.reject(err);
  });

  return deffered.promise;
}

/**
 * Update driver
 * @param id
 * @param data
 * @returns
 */
DriverSchema.statics.update = function(id, data){
  var deffered = Q.defer();

  _findById(id).then(function(found){
    if(!found) return deffered.reject(error("NOT_FOUND"));

    if(data.firstName) found.firstName = data.firstName;
    if(data.lastName) found.lastName = data.lastName;
    if(data.email) found.email = data.email;
    if(data.phone) found.phone = data.phone;
    if(data.address) found.address = data.address;

    found.save(function(err, driver){
      if(err){
        logger.error('Database error - ' + JSON.stringify(err) + ' while trying to update driver with id ' + id);
        return deffered.reject(error("MONGO_ERROR"));
      };
      return deffered.resolve(driver);
    });
  }).fail(function(err){
    deffered.reject(err);
  });

  return deffered.promise;
}

/**
 * Delete driver
 * @param id
 * @returns {*}
 */
DriverSchema.statics.delete = function(id){
  var deffered = Q.defer();

  _findById(id).then(function(found){
    if(!found) return deffered.reject(error("NOT_FOUND"));

    model.remove({"_id" : mongoose.Types.ObjectId(id)}, function(err){
      if(err){
        logger.error('Database error - ' + JSON.stringify(err) + ' while trying to delete driver with id ' + driverId);
        return deffered.reject(error("MONGO_ERROR"));
      };
      return deffered.resolve();
    });
  }).fail(function(err){
    deffered.reject(err);
  });

  return deffered.promise;
}


var model = mongoose.model('driver', VehicleSchema);

module.exports = model;