var mongoose = require('mongoose');

module.exports = (function() {
  var ManagerSchema = new mongoose.Schema({
    /**
     * Manager first name
     */
    firstName: {
      type: String,
      required: true
    },
    /**
     * Manager last name
     */
    lastName: {
      type: String,
      required: true
    },
    /**
     * Manager email address
     */
    email: {
      type: String,
      unique: true,
      required: true
    },
    /**
     * Manager phone
     */
    phone: {
      type: String
    },
    /**
     * Manager password
     */
    password: {
      type: String,
      required: true
    }
  });

  return ManagerSchema;
})();
