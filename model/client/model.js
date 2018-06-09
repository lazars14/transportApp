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
var _findByEmail = function (email){
    var deffered = Q.defer();

    model.findOne({email: email}, function (err, client) {
        if (err) {
            logger.error('Database error - ' + JSON.stringify(err) + 'while trying to find client with email ' + email);
            return deffered.reject(error("MONGO_ERROR"));
        };
        deffered.resolve(client);
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

/**
 * Create dummy client
 * @param newClient
 */
ClientSchema.statics.createDummyClient = function(newClient){
    var deffered = Q.defer();

    newClient = new model(newClient);
    newClient.password = bcrypt.hashSync(newClient.password, bcrypt.genSaltSync(8), null);
    newClient.save(function(err, client){
        if(err){
            logger.error('Database error - ' + JSON.stringify(err) + 'while trying to create dummy client');
            return deffered.reject(error("MONGO_ERROR"));
        };

        client.password = undefined;
        delete client.password;
        return deffered.resolve(client);
    });

    return deffered.promise;
}

/**
 * Client login
 * @param client
 * @returns {*}
 */
ClientSchema.statics.login = function (client) {
    var deffered = Q.defer();

    _findByEmail(client.email).then(function (found) {
        console.log('found client ', found);
        console.log('passed client ', client);
        if(found === null) return deffered.reject(error("INVALID_USERNAME_PASSWORD"));

        if (!model.validatePassword(client.password, found.password)) return deffered.reject(error("INVALID_USERNAME_PASSWORD"));

        var token = jwt.sign({email: found.email, clientId: found._id}, config.token.secret, {
            expiresInMinutes: 1440 // expires in 24 hours
        });

        found.password = undefined;
        delete found.password;
        return deffered.resolve({token: token, client: found});
        })
        .fail(function (err) {
            deffered.reject(err);
        });

    return deffered.promise;
}

/**
 * Update client info
 * @param id
 * @param data
 */
ClientSchema.statics.update = function(id, data){
    var deffered = Q.defer();

    _findById(id).then(function(found){
        if(!found) return deffered.reject(error("NOT_FOUND"));

        if(data.firstName) found.firstName = data.firstName;
        if(data.lastName) found.lastName = data.lastName;
        if(data.phone) found.phone = data.phone;
        if(data.email) found.email = data.email; 
        if(data.password) found.password = found.cryptPassword(data.password);

        found.save(function(err, client){
            if(err){
                logger.error('Database error - ' + JSON.stringify(err) + 'while trying to update client with id ' + id);
                return deffered.reject(error("MONGO_ERROR"));
            };

            client.password = undefined;
            delete client.password;
            return deffered.resolve(client);
        });
    }).fail(function(err){
        deffered.reject(err);
    });

    return deffered.promise;
} 
var model = mongoose.model('clients', ClientSchema);

module.exports = model;
