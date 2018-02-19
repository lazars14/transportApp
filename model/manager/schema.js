var mongoose = require('mongoose');

module.exports = (function() {
  var ManagerSchema = new mongoose.Schema({
    /**
     * Manager first name
     */
    firstName: {
      type: String
    },
    /**
     * Manager last name
     */
    lastName: {
      type: String
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
