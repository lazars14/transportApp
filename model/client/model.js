var
  Q             = require("q"),
  bcrypt        = require('bcryptjs'),
  ClientSchema  = require('./schema.js'),
  config        = require('../../config/'),
  jwt           = require('jsonwebtoken'),
  mongoose      = require('mongoose');

ClientSchema.methods.cryptPassword = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

ClientSchema.statics.validatePassword = function (password, hash) {
  return bcrypt.compareSync(password, hash);
};

/**
 * find by email
 * @param email
 * @returns {*}
 */
function _findByEmail(email){
    var deffered = Q.defer();

    model.findOne({email : email}, function(err, data){
        if(err){
            logger.error('Database error - ' + JSON.stringify(err) + 'while trying to find client with email ' + email);
            return deffered.reject(error("MONGO_ERROR"));
        };
        deffered.resolve(data);
    });

    return deffered.promise;
}

/**
 * find by id
 * @param id
 * @returns {*}
 */
function _findById(id){
    var deffered = Q.defer();

    model.findOne({"_id" : mongoose.Types.ObjectId(id)}, function(err, data){
        if(err){
            logger.error('Database error - ' + JSON.stringify(err) + 'while trying to find client with id ' + id);
            return deffered.reject(error("MONGO_ERROR"));
        };
        deffered.resolve(data);
    });

    return deffered.promise;
}

/**
 * Find by email
 * @param email
 * @returns {*}
 */
ClientSchema.statics.findByEmail = function(email){
    return _findByEmail(email);
}

/**
 * Find by id
 * @param id
 * @returns {*}
 */
ClientSchema.statics.findById = function(id){
    return _findById(id);
}

// to do

// /**
//  * Get client info
//  * @returns {*}
//  */
// ClientSchema.statics.getClientInfo = function(){
//     var deffered = Q.defer();

//     model.findOne

//     return deffered.promise;
// }

/**
 * Client login
 * @param client
 * @returns {*}
 */
ClientSchema.statics.login = function(client){
    var deffered = Q.defer();

    _findByEmail(client.email).then(function (found) {
        if (!model.validatePassword(client.password, found.password))
          return deferred.reject(error("INVALID_USERNAME_PASSWORD"));
  
        var token = jwt.sign({email: found.email, clientId: found._id}, config.token.secret, {
          expiresInMinutes: 1440 // expires in 24 hours
        });
  
        found.password = undefined;
        delete found.password;
        return deferred.resolve({token: token, client: found});
      })
      .fail(function (err) {
        deferred.reject(err);
      });
    
    return deferred.promise;
}

/**
 * Update client info
 * @param id
 * @param data
 */
ClientSchema.statics.update = function(id){
    var deffered = Q.defer();

    _findById(id).then(function(found){
        if(!found) return deffered.reject(error("NOT_FOUND"));

        if(data.firstName) found.firstName = data.firstName;
        if(data.lastName) found.lastName = data.lastName;
        if(data.phone) found.phone = data.phone;
        if(data.email) found.email = data.email; 
        if(data.password) found.password = data.password;

        found.save(function(err, client){
            if(err){
                logger.error('Database error - ' + JSON.stringify(err) + 'while trying to update client with id ' + id);
                return deffered.reject(error("MONGO_ERROR"));
            };
            return deffered.resolve(client);
        });
    }).fail(function(err){
        deffered.reject(err);
    });

    return deffered.promise;
} 


var model = mongoose.model('client', ClientSchema);

module.exports = model;
