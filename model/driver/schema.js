var mongoose = require('mongoose');

module.exports = (function () {
  var DriverSchema = new mongoose.Schema({
    /**
     * Driver first name
     */
    firstName: {
      type: String,
      required: true
    },
    /**
     * Driver last name
     */
    lastName: {
      type: String,
      required: true
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
      type: String,
      required: true
    },
    /**
     * Driver address
     */
    address: {
      type: String
    }
  });

  return DriverSchema;
})();