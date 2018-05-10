var
    Q = require("q"),
    config = require('../../config/'),
    FCM = require('fcm-push'),
    userModel = require('../../model/user/model');

/**
 * Send push notification
 * @param userToken
 * @param message
 */
function sendPushNotification(userToken, message) {
    var deferred = Q.defer();

    var fcm = new FCM(config.firebaseServerKey);

    var message = {
        to: userToken,
        collapse_key: 'your_collapse_key', 
        data: {
            message: message
        },
        notification: {
            title: 'Transportero',
            body: message
        }
    };

    fcm.send(message, function(err, response){
        if (err) {
            // something went wrong, server wrong
            deferred.reject(error("MONGO_ERROR"));
        } else {
            deferred.resolve(response);
        }
    });

    return deferred.promise;
};