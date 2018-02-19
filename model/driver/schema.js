var mongoose = require('mongoose');

module.exports = (function () {
  var DriverSchema = new mongoose.Schema({
    /**
     * Driver first name
     */
    firstName: {
      type: String
    },
    /**
     * Driver last name
     */
    lastName: {
      type: String
    },
    /**
     * Driver email address
     */
    email: {
        type: String,
        unique: true,
        required: true
      },
    /**
     * Driver phone
     */
    phone: {
      type: String
    },
    /**
     * Driver address
     */
    address: {
      type: String,
      default: ""
    }
  });

  return DriverSchema;
})();