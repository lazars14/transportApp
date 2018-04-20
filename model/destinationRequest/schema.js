var mongoose = require('mongoose');

module.exports = (function () {
  var DestinationRequestSchema = new mongoose.Schema({
    /**
     * DestinationRequest start location
     */
    startLocation: {
      type: Object,
      required: true
    },
    /**
     * DestinationRequest end location
     */
    endLocation: {
      type: Object,
      required: true
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
     * DestinationRequest price discount
     */
    discount: {
      type: Number,
      default: 0
    },
    /**
     * DestinationRequest status [0 - submitted, 1 - waiting for confirmation (should wait at least 1 day before rejecting), 2 - accepted, 3 - rejected]
     */
    status: {
      type: Number,
      default: 0
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
    },
    /**
     * DestinationRequest user id
     */
    userId: {
      type: String,
      required: true
    },
    /**
     * DestinationRequest destination order
     */
    destinationOrder: {
      type: Number
    },
    /**
     * DestinationRequest request distance (km)
     */
    distance: {
      type: Number
    }
  });

  return DestinationRequestSchema;
})();

