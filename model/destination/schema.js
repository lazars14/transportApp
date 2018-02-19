var mongoose = require('mongoose');

module.exports = (function () {
  var DestinationSchema = new mongoose.Schema({
    /**
     * Destination start location
     */
    startLocation: {
      type: Object
    },
    /**
     * Destination end location
     */
    endLocation: {
      type: Object
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
      type: Number
    },
    /**
     * Destination vehicle id
     */
    vehicleId: {
      type: String
    },
    /**
     * Destination driver id
     */
    driverId: {
        type: String
    },
    /**
     * Destination manager id
     */
    managerId: {
        type: String
    }
  });

  return DestinationSchema;
})();
