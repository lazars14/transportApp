var
  Q             = require("q"),
  bcrypt        = require('bcryptjs'),
  UserSchema    = require('./schema.js'),
  config        = require('../../config/'),
  jwt           = require('jsonwebtoken'),
  mongoose      = require('mongoose');

UserSchema.methods.cryptPassword = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.statics.validatePassword = function (password, hash) {
  return bcrypt.compareSync(password, hash);
};

/**
 * find user by id
 * @param id
 * @returns {*}
 */
var _findById = function(id){
    var deffered = Q.defer();

    model.findOne({"_id" : mongoose.Types.ObjectId(id)}, function(err, user){
        if(err){
            logger.error('Database error - ' + JSON.stringify(err) + 'while trying to find user with id ' + id);
            return deferred.reject(error("MONGO_ERROR"));
        };
        deffered.resolve(user);
    });

    return deffered.promise;
}

/**
 * find user by email
 * @param email
 * @returns {*}
 */
var _findByEmail = function (email){
    var deffered = Q.defer();
    
    model.findOne({email : email}, function(err, user){
        if(err){
            logger.error('Database error - ' + JSON.stringify(err) + 'while trying to find user with email ' + email);
            return deffered.reject(error("MONGO_ERROR"));
        }
        deffered.resolve(user);
    });

    return deffered.promise;
}

/**
 * Find user by id
 * @param id
 * @returns {*}
 */
UserSchema.statics.findById = function(id){
    return _findById(id);
}

/**
 * Find user by email
 * @param email
 * @returns {*}
 */
UserSchema.statics.findByEmail = function(email){
    return _findByEmail(email);
}

/**
 * Find all users
 * @returns {*}
 */
UserSchema.statics.findAll = function(){
    var deffered = Q.defer();

    model.find({}, function(err, users){
        if(err){
            logger.error('Database error - ' + JSON.stringify(err) + 'while trying to find all users');
            return deffered.reject(error("MONGO_ERROR"));
        };
        return deffered.resolve(users);
    });

    return deffered.promise;
}

/**
 * Register user
 * @param user
 * @returns {*}
 */
UserSchema.statics.register = function(user){
    var deffered = Q.defer();
    var uuid = user.uuid;
    user = new model(user);
    _findByEmail(user.email).then(function(found){
        if(found) return deffered.reject(error("ALREADY_REGISTERED"));

        user.password = user.cryptPassword(user.password);
        user.save(function(err, data){
            if(err){
                logger.error('Database error - ' + JSON.stringify(err) + 'while trying to register user');
                return deffered.reject(error("MONGO_ERROR"));
            };
            return deffered.resolve(data);
        });

    }).fail(function(err){
        deffered.reject(err);
    });

    return deffered.promise;
}

/**
 * Login user
 * @param user
 * @returns {*}
 */
UserSchema.statics.login = function (user) {
    var deferred = Q.defer();

    _findByEmail(user.email).then(function (found) {
        if (!model.validatePassword(user.password, found.password)) return deferred.reject(error("INVALID_USERNAME_PASSWORD"));

        var token = jwt.sign({email: found.email, userId: found._id}, config.token.secret, {
          expiresIn: 1440 // expires in 24 hours
        });
  
        found.password = undefined;
        delete found.password;
        return deferred.resolve({token: token, user: found});
      })
      .fail(function (err) {
        deferred.reject(err);
      });
      
    return deferred.promise;
};

/**
 * Update user
 * @param id
 * @param data
 */
UserSchema.statics.update = function(id, data){
    var deffered = Q.defer();

    _findById(id).then(function(found){
        if(!found) return deffered.reject(error("NOT_FOUND"));

        if(data.firstName) found.firstName = data.firstName;
        if(data.lastName) found.lastName = data.lastName;
        if(data.phone) found.phone = data.phone;
        if(data.address) found.address = data.address;
        if(data.tokens) found.tokens = data.tokens;
        if(data.imeis) found.imeis = data.imeis;

        found.save(function(err, user){
            if(err){
                logger.error('Database error - ' + JSON.stringify(err) + 'while trying to update user with id ' + id);
                return deffered.reject(error("MONGO_ERROR"));
            };
            return deffered.resolve(user);
        });

    }).fail(function(err){
        deffered.reject(err);
    });

    return deffered.promise;
}

/**
 * Delete user
 * @param id
 * @returns {*}
 */
UserSchema.statics.delete = function(id){
    var deffered = Q.defer();

    _findById(id).then(function(found){
        if(!found) return deffered.reject(error("NOT_FOUND"));

        model.remove({"_id" : mongoose.Types.ObjectId(id)}, function(err){
            if(err){
                logger.error('Database error - ' + JSON.stringify(err) + 'while trying to delete user with id ' + id);
                return deffered.reject(error('MONGO_ERROR'));
            };
            return deffered.resolve();
        });

    }).fail(function(err){
        deffered.reject(err);
    });

    return deffered.promise;
}

/**
 * Change user password
 * @param id
 * @param data
 */
UserSchema.statics.changePassword = function(id, data){
    var deffered = Q.defer();

    _findById(id).then(function(found){
        if(!found) return deffered.reject(error("NOT_FOUND"));

        if(!model.validatePassword(data.oldPassword, found.password)) return deffered.reject(error("NOT_ALLOWED"));

        found.password = found.cryptPassword(data.newPassword);

        found.save(function(err){
            if(err){
                logger.error('Database error - ' + JSON.stringify(err) + 'while trying to update user password with id ' + id);
                return deffered.reject(error("MONGO_ERROR"));
            };
            // don't have to delete password, because I'm not returning the user object
            return deffered.resolve();
        });

    }).fail(function(err){
        deffered.reject(err);
    });

    return deffered.promise;
}

/**
 * Change user email
 * @param id
 * @param data
 */
UserSchema.statics.changeEmail = function(id, data){
    var deffered = Q.defer();

    _findById(id).then(function(found){
        if(!found) return deffered.reject(error("NOT_FOUND"));

        if(found.email != data.oldEmail) return deffered.reject(error("NOT_ALLOWED"));

        found.email = data.newEmail;

        found.save(function(err){
            if(err){
                logger.error('Database error - ' + JSON.stringify(err) + 'while trying to update user email with email ' + data.newEmail + ' (because it already exists) for user with id ' + id);
                // email already exists
                return deffered.reject(error("ALREADY_REGISTERED"));
            };
            return deffered.resolve();
        });

    }).fail(function(err){
        deffered.reject(err);
    });

    return deffered.promise;
}

var model = mongoose.model('users', UserSchema);

module.exports = model;


