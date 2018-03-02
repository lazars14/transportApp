var mongoose = require('mongoose');

module.exports = (function () {
  var ClientSchema = new mongoose.Schema({
    /**
     * Client first name
     */
    firstName: {
      type: String
    },
    /**
     * Client last name
     */
    lastName: {
      type: String
    },
    /**
     * Client email address
     */
    email: {
      type: String,
      unique: true,
      required: true
    },
    /**
     * Client password
     */
    password: {
      type: String,
      required: true
    },
    /**
     * Client phone
     */
    phone: {
      type: String
    }
  });

  return ClientSchema;
})();
