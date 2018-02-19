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
     * DestinationRequest status [0 - submitted, 1 - awaitingConfirmation (await period 1 day), 2 - accepted]
     */
    status: {
      type: String
    },
    /**
     * DestinationRequest destination id
     */
    destinationId: {
      type: String
    }
  });

  return DestinationRequestSchema;
})();

