var mongoose = require('mongoose');

module.exports = (function () {
  var DestinationSchema = new mongoose.Schema({
    /**
     * Destination start location
     */
    startLocation: {
      type: Object,
      required: true
    },
    /**
     * Destination end location
     */
    endLocation: {
      type: Object,
      required: true
    },
    /**
     * Destination start date
     */
    startDate: {
      type: Date
    },
    /**
     * Destination end date
     */
    endDate: {
      type: Date
    },
    /**
     * Destination driver's pay (per 100km)
     */
    driversPay: {
      type: Number
    },
    /**
     * Destination number of km's
     */
    numberOfKms: {
      type: Number
    },
    /**
     * Destination fuelExpenses (per 100km)
     */
    fuelExpenses: {
      type: Number,
      required: true
    },
    /**
     * Destination vehicle id
     */
    vehicleId: {
      type: String,
      required: true
    },
    /**
     * Destination drivers
     */
    drivers: {
        type: Array
    },
    /**
     * Destination manager id
     */
    managerId: {
        type: String,
        required: true
    }
  });

  return DestinationSchema;
})();
