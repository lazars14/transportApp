var mongoose = require('mongoose');

module.exports = (function () {
  var VehicleSchema = new mongoose.Schema({
    /**
     * Vehicle name
     */
    name: {
      type: String
    },
    /**
     * Vehicle model
     */
    model: {
      type: String
    },
    /**
     * Vehicle license plate
     */
    licensePlate: {
      type: String,
      unique: true,
      required: true
    },
    /**
     * Vehicle license expire date
     */
    licenseExpireDate: {
      type: Date,
      required: true
    },
    /**
     * Vehicle number of seats
     */
    numberOfSeats: {
      type: Number,
      required: true
    },
    /**
     * Vehicle production year
     */
    productionYear: {
      type: Number
    },
    /**
     * Vehicle number of km passed
     */
    numberOfKmPassed: {
      type: Number
    }
  });

  return VehicleSchema;
})();
