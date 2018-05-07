var mongoose = require('mongoose');

module.exports = (function () {
  var UserSchema = new mongoose.Schema({
    /**
     * User first name
     */
    firstName: {
      type: String
    },
    /**
     * User last name
     */
    lastName: {
      type: String
    },
    /**
     * User email address
     */
    email: {
        type: String,
        unique: true,
        required: true
      },
    /**
     * User phone
     */
    phone: {
      type: String
    },
    /**
     * User password
     */
    password: {
      type: String,
      required: true
    },
    /**
     * User address
     */
    address: {
      type: String,
      default: ""
    },
    /**
     * User firebase push token
     */
    firebaseToken: {
        type: String
    }
  });

  return UserSchema;
})();