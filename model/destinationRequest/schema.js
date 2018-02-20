var mongoose = require('mongoose');

module.exports = (function () {
  var DestinationRequestSchema = new mongoose.Schema({
    /**
     * DestinationRequest start location
     */
    startLocation: {
      type: Object
    },
    /**
     * DestinationRequest end location
     */
    endLocation: {
      type: Object
    },
    /**
     * DestinationRequest start date
     */
    startDate: {
      type: Date
    },
    /**
     * DestinationRequest end date
     */
    endDate: {
      type: Date
    },
    /**
     * DestinationRequest price
     */
    price: {
      type: Number
    },
    /**
     * DestinationRequest status [0 - submitted, 1 - waiting for confirmation (should wait at least 1 day before rejecting), 2 - accepted, 3 - rejected]
     */
    status: {
      type: String
    },
    /**
     * DestinationRequest destination id
     */
    destinationId: {
      type: String
    },
    /**
     * DestinationRequest request submission date
     */
    submissionDate: {
      type: Date,
      default: Date.now
    },
    /**
     * DestinationRequest confirmation sent to user to accept date
     */
    confirmationRequestDate: {
      type: Date
    }
  });

  return DestinationRequestSchema;
})();

