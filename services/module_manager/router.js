var controller = require('./controller');
var express = require('express');
var auth = require('../../middleware/authMiddleware');
var router = express.Router();


/**
 * @api {post} /login
 * Manager Login
 * @apiVersion 1.0.0
 * @apiName Manager Login
 * @apiGroup Manager
 * @apiDescription Manager login - login to account
 * 
 * @apiParam (body){String} email Manager email
 * @apiParam (body){String} password Manager password
 * 
 * @apiSuccess {Number} HttpStatus 200 if everything is ok
 * @apiSuccess {String} token Manager token - expiration time one day
 * {
 *    "token": "23042016MSSSU2-032AE0AA"
 * }
 * 
 * @apiUse internalError
 * @apiUse badRequest
 * @apiUse invalidCredentials
 */
router.post('/login', controller.loginManager);

/**
 * @api {put} /{managerId}
 * Update Manager Info
 * @apiVersion 1.0.0
 * @apiName Update Manager
 * @apiGroup Manager
 * @apiDescription Manager update data - update data
 * 
 * @apiParam (path){String} managerId Manager id
 * 
 * @apiParam (body){String} [email] Manager email
 * @apiParam (body){String} [password] Manager password
 * @apiParam (body){String} [firstName] Manager firstname
 * @apiParam (body){String} [lastName] Manager lastname
 * @apiParam (body){String} [phone] Manager phone
 * 
 * @apiSuccess {Number} HttpStatus 200 if everything is ok
 * @apiSuccess {Object} Manager Updated manager
 * {
 *    "_id": "a-d.x-;s-39;x-s9-3la-fl2",
 *    "firstName": "John",
 *    "lastName": "Doe",
 *    "phone": "060/123456",
 *    "email": "johndoe@gmail.com",
 *    "password": "a3-xjd=-s,;kfga=dg"
 * }
 * 
 * @apiUse internalError
 * @apiUse notFound
 * @apiUse badRequest
 * @apiUse notAuthorized
 */
router.put('/:managerId', auth.checkManagerToken, auth.checkManagerId, controller.updateManager);

/**
 * @api {get} /{managerId}/vehicles
 * Get All Vehicles
 * @apiVersion 1.0.0
 * @apiName Get All vehicles
 * @apiGroup Manager
 * @apiDescription Manager get all vehicles - get all vehicles
 * 
 * @apiParam (path){String} managerId Manager id
 * 
 * @apiSuccess {Number} HttpStatus 200 if everything is ok
 * @apiSuccess {Array} Vehicles All vehicles
 * [
 *      {
 *           "_id": "a-d.x-;s-39;x-s9-3la-fl2",
 *           "name": "First bus",
 *           "model": "Mercedes-Benz do Brasil",
 *           "licensePlate" : "NS-123-AD",
 *           "licenseExpireDate": "2019-10-21",
 *           "numberOfSeats": "50",
 *           "productionYear": "2015",
 *           "numberOfKmPassed": "50000"
 *        },
 *        {
 *           "_id": "add.x-;s-39;x-s9-3la-awe",
 *           "name": "Second bus",
 *           "model": "Mercedes-Benz do Brasil",
 *           "licensePlate" : "NS-456-BC",
 *           "licenseExpireDate": "2019-10-21",
 *           "numberOfSeats": "50",
 *           "productionYear": "2015",
 *           "numberOfKmPassed": "55000"
 *        }
 * ]
 * 
 * @apiUse internalError
 * @apiUse notFound
 * @apiUse notAuthorized
 */
router.get('/:managerId/vehicles', auth.checkManagerToken, auth.checkManagerId, controller.getAllVehicles);

/**
 * @api {get} /{managerId}/vehicles/{vehicleId}/expenses
 * Get All Expenses For Vehicle
 * @apiVersion 1.0.0
 * @apiName Get All Expenses For Vehicle
 * @apiGroup Manager
 * @apiDescription Manager get all vehicle expenses - get all expenses for specific vehicle
 * 
 * @apiParam (path){String} managerId Manager id
 * @apiParam (path){String} vehicleId Vehicle id
 * 
 * @apiSuccess {Number} HttpStatus 200 if everything is ok
 * @apiSuccess {Array} Expenses All expenses for vehicle
 * [
 *      {
 *          "_id": "a-d.x-;s-39;x-s9-3la-fl2",
 *          "name": "firstExpense",
 *          "amount": "1000.00",
 *          "vehicleId" : "awadx-;s-39;x-s9-3la-fff",
 *          "date": "2018-03-01"
 *      },
 *      {
 *          "_id": "aas-;s-39;x-s9-3la-fwirw",
 *          "name": "secondExpense",
 *          "amount": "1500.00",
 *          "vehicleId" : "awadx-;s-39;x-s9-3la-fff",
 *          "date": "2018-03-01"
 *      },
 * ]
 * 
 * @apiUse internalError
 * @apiUse notFound
 * @apiUse notAuthorized
 */
router.get('/:managerId/vehicles/:vehicleId/expenses', auth.checkManagerToken, auth.checkManagerId, controller.getExpensesForVehicle);

/**
 * @api {get} /{managerId}/vehicles/{vehicleId}/expenses/{vehicleExpenseId}
 * Get Expense By Id
 * @apiVersion 1.0.0
 * @apiName Get Expense By Id
 * @apiGroup Manager
 * @apiDescription Manager get expense by id - get expense by specific id
 * 
 * @apiParam (path){String} managerId Manager id
 * @apiParam (path){String} vehicleId Vehicle id
 * @apiParam (path){String} vehicleExpenseId Expense id
 * 
 * @apiSuccess {Number} HttpStatus 200 if everything is ok
 * @apiSuccess {Object} Expense Object expense
 * {
 *     "_id": "a-d.x-;s-39;x-s9-3la-fl2",
 *     "name": "firstExpense",
 *     "amount": "1000.00",
 *     "vehicleId" : "awadx-;s-39;x-s9-3la-fff",
 *     "date": "2018-03-01"
 * }
 * 
 * @apiUse internalError
 * @apiUse notFound
 * @apiUse notAuthorized
 */
router.get('/:managerId/vehicles/:vehicleId/expenses/:vehicleExpenseId', auth.checkManagerToken, auth.checkManagerId, controller.getExpenseById);

/**
 * @api {post} /{managerId}/vehicles/{vehicleId}/expenses
 * Add Expense For Vehicle
 * @apiVersion 1.0.0
 * @apiName Add Expense For Vehicle
 * @apiGroup Manager
 * @apiDescription Manager add expense for vehicle - add expense for specific vehicle
 * 
 * @apiParam (path){String} managerId Manager id
 * @apiParam (path){String} vehicleId Vehicle id
 * 
 * @apiParam (body){String} name Expense name
 * @apiParam (body){Number} amount Expense amount
 * 
 * @apiSuccess {Number} HttpStatus 200 if everything is ok
 * @apiSuccess {Object} Expense Created expense
 * {
 *     "_id": "a-d.x-;s-39;x-s9-3la-fl2",
 *     "name": "firstExpense",
 *     "amount": "1000.00",
 *     "vehicleId" : "awadx-;s-39;x-s9-3la-fff",
 *     "date": "2018-03-01"
 * }
 * 
 * @apiUse internalError
 * @apiUse badRequest
 * @apiUse notFound
 * @apiUse notAuthorized
 */
router.post('/:managerId/vehicles/:vehicleId/expenses', auth.checkManagerToken, auth.checkManagerId, controller.addExpense);

/**
 * @api {put} /{managerId}/vehicles/{vehicleId}/expenses/{vehicleExpenseId}
 * Update Expense For Vehicle
 * @apiVersion 1.0.0
 * @apiName Update Expense For Vehicle
 * @apiGroup Manager
 * @apiDescription Manager update expense for vehicle - update expense for specific vehicle
 * 
 * @apiParam (path){String} managerId Manager id
 * @apiParam (path){String} vehicleId Vehicle id
 * @apiParam (path){String} vehicleExpenseId Expense id
 * 
 * @apiParam (body){String} name Expense name
 * @apiParam (body){String} amount Expense amount
 * 
 * @apiSuccess {Number} HttpStatus 200 if everything is ok
 * @apiSuccess {Object} Expense Updated expense
 * {
 *     "_id": "a-d.x-;s-39;x-s9-3la-fl2",
 *     "name": "firstExpense",
 *     "amount": "1000.00",
 *     "vehicleId" : "awadx-;s-39;x-s9-3la-fff",
 *     "date": "2018-03-01"
 * }
 * 
 * @apiUse internalError
 * @apiUse badRequest
 * @apiUse notFound
 * @apiUse notAuthorized
 */
router.put('/:managerId/vehicles/:vehicleId/expenses/:vehicleExpenseId', auth.checkManagerToken, auth.checkManagerId, controller.updateExpense);

/**
 * @api {delete} /{managerId}/vehicles/{vehicleId}/expenses/{vehicleExpenseId}
 * Delete Expense For Vehicle
 * @apiVersion 1.0.0
 * @apiName Delete Expense For Vehicle
 * @apiGroup Manager
 * @apiDescription Manager delete expense for vehicle - delete expense for specific vehicle
 * 
 * @apiParam (path){String} managerId Manager id
 * @apiParam (path){String} vehicleId Vehicle id
 * @apiParam (path){String} vehicleExpenseId Expense id
 * 
 * @apiSuccess {Number} HttpStatus 200 if everything is ok
 * 
 * @apiUse internalError
 * @apiUse notFound
 * @apiUse notAuthorized
 */
router.delete('/:managerId/vehicles/:vehicleId/expenses/:vehicleExpenseId', auth.checkManagerToken, auth.checkManagerId, controller.deleteExpense);

/**
 * @api {put} /{managerId}/vehicles/{vehicleId}/extendRegistration
 * Extend Registration For Vehicle
 * @apiVersion 1.0.0
 * @apiName Extend Registration For Vehicle
 * @apiGroup Manager
 * @apiDescription Manager extend registration for vehicle - extend registration for specific vehicle
 * 
 * @apiParam (path){String} managerId Manager id
 * @apiParam (path){String} vehicleId Vehicle id
 * 
 * @apiParam (body){String} licensePlate Vehicle new license plate
 * @apiParam (body){Date} licenseExpireDate Vehicle new license expire date
 * 
 * @apiSuccess {Number} HttpStatus 200 if everything is ok
 * 
 * @apiUse internalError
 * @apiUse notFound
 * @apiUse badRequest
 * @apiUse notAuthorized
 */
router.put('/:managerId/vehicles/:vehicleId/extendRegistration', auth.checkManagerToken, auth.checkManagerId, controller.extendVehicleRegistration);

/**
 * @api {get} /{managerId}/users
 * Get All Users
 * @apiVersion 1.0.0
 * @apiName Get All Users
 * @apiGroup Manager
 * @apiDescription Manager get all users - get all users
 * 
 * @apiParam (path){String} managerId Manager id
 * 
 * @apiSuccess {Number} HttpStatus 200 if everything is ok
 * @apiSuccess {Array} Users All users
 * [
 *      {
 *          "_id": "a-d.x-;s-39;x-s9-3la-fl2",
 *          "firstName": "John",
 *          "lastName": "Doe",
 *          "phone": "060/123456",
 *          "email": "johndoe@gmail.com",
 *          "password": "a3-xjd=-s,;kfga=dg"
 *      },
 *      {
 *          "_id": "aasdfse-39;x-s9-3la-fl2",
 *          "firstName": "Johna",
 *          "lastName": "Doe",
 *          "phone": "060/234567",
 *          "email": "johnadoe@gmail.com",
 *          "password": "a3-asdfxjd=-s,;kfga=dg"
 *      }
 * ]
 * 
 * @apiUse internalError
 * @apiUse notFound
 * @apiUse notAuthorized
 */
router.get('/:managerId/users', auth.checkManagerToken, auth.checkManagerId, controller.findAllUsers);

/**
 * @api {delete} /{managerId}/users/{userId}
 * Delete User
 * @apiVersion 1.0.0
 * @apiName Delete User
 * @apiGroup Manager
 * @apiDescription Manager delete user - delete user 
 * 
 * @apiParam (path){String} managerId Manager id
 * @apiParam (path){String} userId User id
 * 
 * @apiSuccess {Number} HttpStatus 200 if everything is ok
 * 
 * @apiUse internalError
 * @apiUse notFound
 * @apiUse notAuthorized
 */
router.delete('/:managerId/users/:userId', auth.checkManagerToken, auth.checkManagerId, controller.deleteUser);

/**
 * @api {get} /{managerId}/destinations/
 * Get All Destinations For Manager
 * @apiVersion 1.0.0
 * @apiName Get All Destinations For Manager
 * @apiGroup Manager
 * @apiDescription Manager get all destinations - get all destinations for manager with specific id
 * 
 * @apiParam (path){String} managerId Manager id
 * 
 * @apiSuccess {Number} HttpStatus 200 if everything is ok
 * @apiSuccess {Array} Destinations All destinations for manager
 * [
 *      {
 *          "_id": "a-d.x-;s-39;x-s9-3la-fl2",
 *          "name": "firstExpense",
 *          "amount": "1000.00",
 *          "vehicleId" : "awadx-;s-39;x-s9-3la-fff",
 *          "date": "2018-03-01"
 *      },
 *      {
 *          "_id": "aas-;s-39;x-s9-3la-fwirw",
 *          "name": "secondExpense",
 *          "amount": "1500.00",
 *          "vehicleId" : "awadx-;s-39;x-s9-3la-fff",
 *          "date": "2018-03-01"
 *      },
 * ]
 * 
 * @apiUse internalError
 * @apiUse notFound
 * @apiUse notAuthorized
 */
router.get('/:managerId/destinations', auth.checkManagerToken, auth.checkManagerId, controller.findDestinationsByManagerId);

/**
 * @api {get} /{managerId}/destinations/other
 * Get All Destinations Not Handled By Manager
 * @apiVersion 1.0.0
 * @apiName Get All Destinations Not Handled By Manager
 * @apiGroup Manager
 * @apiDescription Manager get all destinations - get all destinations not handled by manager with specific id
 * 
 * @apiParam (path){String} managerId Manager id
 * 
 * @apiSuccess {Number} HttpStatus 200 if everything is ok
 * @apiSuccess {Array} Destinations All destinations for manager
 * [
 *      {
 *          "_id": "a-d.x-;s-39;x-s9-3la-fl2",
 *          "name": "firstExpense",
 *          "amount": "1000.00",
 *          "vehicleId" : "awadx-;s-39;x-s9-3la-fff",
 *          "date": "2018-03-01"
 *      },
 *      {
 *          "_id": "aas-;s-39;x-s9-3la-fwirw",
 *          "name": "secondExpense",
 *          "amount": "1500.00",
 *          "vehicleId" : "awadx-;s-39;x-s9-3la-fff",
 *          "date": "2018-03-01"
 *      },
 * ]
 * 
 * @apiUse internalError
 * @apiUse notFound
 * @apiUse notAuthorized
 */
router.get('/:managerId/destinations/other', auth.checkManagerToken, auth.checkManagerId, controller.findDestinationsByManagerIdNot);

/**
 * @api {get} /{managerId}/destinations/{destinationId}
 * Find Destination By Id
 * @apiVersion 1.0.0
 * @apiName Find Destination By Id
 * @apiGroup Manager
 * @apiDescription Manager find destination by id - find destination by specific id
 * 
 * @apiParam (path){String} managerId Manager id
 * @apiParam (path){String} destinationId Destination id
 * 
 * @apiSuccess {Number} HttpStatus 200 if everything is ok
 * @apiSuccess {Array} Expenses All expenses for vehicle
 * {
 *     "_id": "a-d.x-;s-39;x-s9-3la-fl2",
 *     "name": "firstExpense",
 *     "amount": "1000.00",
 *     "vehicleId" : "awadx-;s-39;x-s9-3la-fff",
 *     "date": "2018-03-01"
 * }
 * 
 * @apiUse internalError
 * @apiUse notFound
 * @apiUse notAllowed
 * @apiUse notAuthorized
 */
router.get('/:managerId/destinations/:destinationId', auth.checkManagerToken, auth.checkManagerId, controller.findDestinationById);

/**
 * @api {post} /{managerId}/destinations
 * Add Destination
 * @apiVersion 1.0.0
 * @apiName Add Destination
 * @apiGroup Manager
 * @apiDescription Manager add destination - add destination
 * 
 * @apiParam (path){String} managerId Manager id
 * 
 * @apiParam (body){Object} startLocation Destination start location
 * @apiParam (body){Object} endLocation Destination end location
 * @apiParam (body){Date} startDate Destination start date
 * 
 * @apiSuccess {Number} HttpStatus 200 if everything is ok
 * @apiSuccess {Object} Destination Created destination
 * {
 *     "startLocation" : {
 *          "lat": "45.30",
 *          "lng": "45.30"
 *      },
 *      "endLocation": {
 *          "lat": "45.31",
 *          "lng": "45.31"
 *      },
 * }
 * 
 * @apiUse internalError
 * @apiUse badRequest
 * @apiUse notFound
 * @apiUse notAuthorized
 */
router.post('/:managerId/destinations', auth.checkManagerToken, auth.checkManagerId, controller.addDestination);

/**
 * @api {put} /{managerId}/destinations/{destinationId}
 * Update Destination
 * @apiVersion 1.0.0
 * @apiName Update Destination
 * @apiGroup Manager
 * @apiDescription Manager update destination - update destination
 * 
 * @apiParam (path){String} managerId Manager id
 * @apiParam (path){String} destinationId Destination id
 * 
 * @apiParam (body){Object} [startLocation] Expense name
 * @apiParam (body){Object} [endLocation] Expense amount
 * @apiParam (body){String} [startDate] Expense name
 * @apiParam (body){String} [endDate] Expense amount
 * @apiParam (body){String} [driversPay] Expense name
 * @apiParam (body){String} [numberOfKms] Expense amount
 * @apiParam (body){String} [fuelExpenses] Expense name
 * 
 * @apiSuccess {Number} HttpStatus 200 if everything is ok
 * @apiSuccess {Object} Destination Updated destination
 * {
 *     "_id": "a-d.x-;s-39;x-s9-3la-fl2",
 *     "name": "firstExpense",
 *     "amount": "1000.00",
 *     "vehicleId" : "awadx-;s-39;x-s9-3la-fff",
 *     "date": "2018-03-01"
 * }
 * 
 * @apiUse internalError
 * @apiUse notFound
 * @apiUse notAllowed
 * @apiUse notAuthorized
 */
router.put('/:managerId/destinations/:destinationId', auth.checkManagerToken, auth.checkManagerId, controller.updateDestination);

/**
 * @api {delete} /{managerId}/destinations/{destinationId}
 * Delete Destination
 * @apiVersion 1.0.0
 * @apiName Delete Destination
 * @apiGroup Manager
 * @apiDescription Manager delete destination - delete destination
 * 
 * @apiParam (path){String} managerId Manager id
 * @apiParam (path){String} destinationId Destination id
 * 
 * @apiParam (body){String} destinationManagerId Manager id for destination
 * 
 * @apiSuccess {Number} HttpStatus 200 if everything is ok
 * 
 * @apiUse internalError
 * @apiUse notFound
 * @apiUse badRequest
 * @apiUse notAllowed
 * @apiUse notAuthorized
 */
router.delete('/:managerId/destinations/:destinationId', auth.checkManagerToken, auth.checkManagerId, controller.deleteDestination);

/**
 * @api {put} /{managerId}/destinations/{destinationId}/setVehicle
 * Set Destination Vehicle
 * @apiVersion 1.0.0
 * @apiName Set Destination Vehicle
 * @apiGroup Manager
 * @apiDescription Manager set destination vehicle - set destination vehicle
 * 
 * @apiParam (path){String} managerId Manager id
 * @apiParam (path){String} destinationId Destination id
 * 
 * @apiParam (body){String} vehicleId Vehicle id for setting
 * 
 * @apiSuccess {Number} HttpStatus 200 if everything is ok
 * @apiSuccess {Object} Destination Updated destination
 * {
 *     "_id": "a-d.x-;s-39;x-s9-3la-fl2",
 *     "name": "firstExpense",
 *     "amount": "1000.00",
 *     "vehicleId" : "awadx-;s-39;x-s9-3la-fff",
 *     "date": "2018-03-01"
 * }
 * 
 * @apiUse internalError
 * @apiUse notFound
 * @apiUse badRequest
 * @apiUse notAllowed
 * @apiUse notAuthorized
 */
router.put('/:managerId/destinations/:destinationId/setVehicle', auth.checkManagerToken, auth.checkManagerId, controller.setDestinationVehicle);

/**
 * @api {put} /{managerId}/destinations/{destinationId}/setDrivers
 * Set Destination Drivers
 * @apiVersion 1.0.0
 * @apiName Set Destination Drivers
 * @apiGroup Manager
 * @apiDescription Manager set destination drivers - set destination drivers
 * 
 * @apiParam (path){String} managerId Manager id
 * @apiParam (path){String} destinationId Destination id
 * 
 * @apiParam (body){Array} drivers Drivers for destination
 * 
 * @apiSuccess {Number} HttpStatus 200 if everything is ok
 * @apiSuccess {Object} Destination Updated destination
 * {
 *     "_id": "a-d.x-;s-39;x-s9-3la-fl2",
 *     "name": "firstExpense",
 *     "amount": "1000.00",
 *     "vehicleId" : "awadx-;s-39;x-s9-3la-fff",
 *     "date": "2018-03-01"
 * }
 * 
 * @apiUse internalError
 * @apiUse notFound
 * @apiUse badRequest
 * @apiUse notAllowed
 * @apiUse notAuthorized
 */
router.put('/:managerId/destinations/:destinationId/setDrivers', auth.checkManagerToken, auth.checkManagerId, controller.setDestinationDrivers);

/**
 * @api {get} /{managerId}/destinationRequests/submitted
 * Find All Submitted Requests
 * @apiVersion 1.0.0
 * @apiName Find All Submitted Requests
 * @apiGroup Manager
 * @apiDescription Manager find all submitted requests - find all submitted requests
 * 
 * @apiParam (path){String} managerId Manager id
 * 
 * @apiSuccess {Number} HttpStatus 200 if everything is ok
 * @apiSuccess {Array} Requests Submitted requests
 * [
 *      {
 *          "_id": "a-d.x-;s-39;x-s9-3la-fl2",
 *          "firstName": "John",
 *          "lastName": "Doe",
 *          "phone": "060/123456",
 *          "email": "johndoe@gmail.com",
 *          "password": "a3-xjd=-s,;kfga=dg"
 *      },
 *      {
 *          "_id": "aasdfse-39;x-s9-3la-fl2",
 *          "firstName": "Johna",
 *          "lastName": "Doe",
 *          "phone": "060/234567",
 *          "email": "johnadoe@gmail.com",
 *          "password": "a3-asdfxjd=-s,;kfga=dg"
 *      }
 * ]
 * 
 * @apiUse internalError
 * @apiUse notFound
 * @apiUse notAuthorized
 */
router.get('/:managerId/destinationRequests/submitted', auth.checkManagerToken, auth.checkManagerId, controller.findAllRequestsSubmitted);

/**
 * @api {get} /{managerId}/destinationRequests/{destinationId}
 * Get All Requests For Destination
 * @apiVersion 1.0.0
 * @apiName Get All Requests For Destination
 * @apiGroup Manager
 * @apiDescription Manager get all requests for destination - get all requests for destination
 * 
 * @apiParam (path){String} managerId Manager id
 * @apiParam (path){String} destinationId Destination id
 * 
 * @apiSuccess {Number} HttpStatus 200 if everything is ok
 * @apiSuccess {Array} Requests Requests for destination
 * [
 *      {
 *          "_id": "a-d.x-;s-39;x-s9-3la-fl2",
 *          "firstName": "John",
 *          "lastName": "Doe",
 *          "phone": "060/123456",
 *          "email": "johndoe@gmail.com",
 *          "password": "a3-xjd=-s,;kfga=dg"
 *      },
 *      {
 *          "_id": "aasdfse-39;x-s9-3la-fl2",
 *          "firstName": "Johna",
 *          "lastName": "Doe",
 *          "phone": "060/234567",
 *          "email": "johnadoe@gmail.com",
 *          "password": "a3-asdfxjd=-s,;kfga=dg"
 *      }
 * ]
 * 
 * @apiUse internalError
 * @apiUse notFound
 * @apiUse notAuthorized
 */
router.get('/:managerId/destinationRequests/:destinationId', auth.checkManagerToken, auth.checkManagerId, controller.findAllRequestsByDestination);

/**
 * @api {put} /{managerId}/destinationRequests/{destinationRequestId}/setAwaiting
 * Set Destination Request To Awating Confirmation
 * @apiVersion 1.0.0
 * @apiName Set Destination Request To Awating Confirmation
 * @apiGroup Manager
 * @apiDescription Manager set request to awaiting confirmation - set request to awaiting confirmation
 * 
 * @apiParam (path){String} managerId Manager id
 * @apiParam (path){String} destinationRequestId Destination request id
 * 
 * @apiParam (body){String} startDate Request start date
 * @apiParam (body){String} endDate Request end date
 * @apiParam (body){String} destinationId Destination id
 * @apiParam (body){String} destinationOrder Order of request in destination route
 * 
 * @apiSuccess {Number} HttpStatus 200 if everything is ok
 * @apiSuccess {Object} Request DestinationRequest
 * [
 *      {
 *          "_id": "a-d.x-;s-39;x-s9-3la-fl2",
 *          "firstName": "John",
 *          "lastName": "Doe",
 *          "phone": "060/123456",
 *          "email": "johndoe@gmail.com",
 *          "password": "a3-xjd=-s,;kfga=dg"
 *      }
 * ]
 * 
 * @apiUse internalError
 * @apiUse notFound
 * @apiUse badRequest
 * @apiUse notAllowed
 * @apiUse notAuthorized
 */
router.put('/:managerId/destinationRequests/:destinationRequestId/setAwaiting', auth.checkManagerToken, auth.checkManagerId, controller.requestSetAwaiting);

/**
 * @api {put} /{managerId}/destinationRequests/{destinationRequestId}/setAccepted
 * Set Destination Request To Accepted
 * @apiVersion 1.0.0
 * @apiName Set Destination Request To Accepted
 * @apiGroup Manager
 * @apiDescription Manager set request to accepted - set request to accepted
 * 
 * @apiParam (path){String} managerId Manager id
 * @apiParam (path){String} destinationRequestId Destination request id
 * 
 * @apiSuccess {Number} HttpStatus 200 if everything is ok
 * @apiSuccess {Object} Request DestinationRequest
 * [
 *      {
 *          "_id": "a-d.x-;s-39;x-s9-3la-fl2",
 *          "firstName": "John",
 *          "lastName": "Doe",
 *          "phone": "060/123456",
 *          "email": "johndoe@gmail.com",
 *          "password": "a3-xjd=-s,;kfga=dg"
 *      }
 * ]
 * 
 * @apiUse internalError
 * @apiUse notFound
 * @apiUse notAllowed
 * @apiUse notAuthorized
 */
router.put('/:managerId/destinationRequests/:destinationRequestId/setAccepted', auth.checkManagerToken, auth.checkManagerId, controller.requestSetAccepted);

/**
 * @api {put} /{managerId}/destinationRequests/{destinationRequestId}/setRejected
 * Set Destination Request To Rejected
 * @apiVersion 1.0.0
 * @apiName Set Destination Request To Rejected
 * @apiGroup Manager
 * @apiDescription Manager set request to rejected - set request to rejected
 * 
 * @apiParam (path){String} managerId Manager id
 * @apiParam (path){String} destinationRequestId Destination request id
 * 
 * 
 * @apiSuccess {Number} HttpStatus 200 if everything is ok
 * @apiSuccess {Object} Request DestinationRequest
 * [
 *      {
 *          "_id": "a-d.x-;s-39;x-s9-3la-fl2",
 *          "firstName": "John",
 *          "lastName": "Doe",
 *          "phone": "060/123456",
 *          "email": "johndoe@gmail.com",
 *          "password": "a3-xjd=-s,;kfga=dg"
 *      }
 * ]
 * 
 * @apiUse internalError
 * @apiUse notFound
 * @apiUse notAuthorized
 */
router.put('/:managerId/destinationRequests/:destinationRequestId/setRejected', auth.checkManagerToken, auth.checkManagerId, controller.requestSetRejected);

/**
 * @api {get} /{managerId}/drivers
 * Get All Drivers
 * @apiVersion 1.0.0
 * @apiName Get All Drivers
 * @apiGroup Manager
 * @apiDescription Manager drivers - view all drivers
 * 
 * @apiParam (path){String} managerId Manager id
 * 
 * @apiSuccess {Number} HttpStatus 200 if everything is ok
 * @apiSuccess {Array} Drivers Drivers array
 * [
 *        {
 *           "_id": "a-d.x-;s-39;x-s9-3la-fl2",
 *           "firstName": "Driver",
 *           "lastName": "One",
 *           "email" : "driverone@gmail.com",
 *           "phone": "0600123456",
 *           "address": "St. Joseph's Boulevard 50"
 *        },
 *        {
 *           "_id": "a-d.x-;flow1-s9-3la-aswsq",
 *           "firstName": "Driver",
 *           "lastName": "Two",
 *           "email" : "drivertwo@gmail.com",
 *           "phone": "0600234567",
 *           "address": "St. Joseph's Boulevard 50"
 *        }
 * ]
 * 
 * @apiUse internalError
 * @apiUse notFound
 * @apiUse notAuthorized
 */
router.get('/:managerId/drivers', auth.checkManagerToken, auth.checkManagerId, controller.findAllDrivers);

/**
 * @api {post} /{managerId}/vehicles/{vehicleId}/available
 * Check If Vehicle Available
 * @apiVersion 1.0.0
 * @apiName Check If Vehicle Available
 * @apiGroup Manager
 * @apiDescription Manager check if vehicle available - check if vehicle is free for some period
 * 
 * @apiParam (path){String} managerId Manager id
 * @apiParam (path){String} vehicleId Vehicle id
 * 
 * @apiParam (body){Date} startDate Start date of period
 * @apiParam (body){Date} endDate End date of period
 * 
 * @apiSuccess {Number} HttpStatus 200 if everything is ok
 * @apiSuccess {Object} vehicle Vehicle object
 * [
 *        {
 *           "_id": "a-d.x-;s-39;x-s9-3la-fl2",
 *           "firstName": "Driver",
 *           "lastName": "One",
 *           "email" : "driverone@gmail.com",
 *           "phone": "0600123456",
 *           "address": "St. Joseph's Boulevard 50"
 *        }
 * ]
 * 
 * @apiUse internalError
 * @apiUse notFound
 * @apiUse notAuthorized
 */
router.get('/:managerId/vehicles/:vehicleId/available', auth.checkManagerToken, auth.checkManagerId, controller.checkIfVehicleAvailable);

logger.info('loaded MANAGER routes');

module.exports = router;
