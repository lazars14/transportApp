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
 * @apiUse notFound
 * @apiUse badRequest
 * @apiUse invalidCredentials
 */
router.post('/login', controller.loginManager);

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
 * @apiUse notAuthorized
 */
router.get('/:managerId/vehicles', auth.checkManagerToken, controller.getAllVehicles);

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
router.get('/:managerId/vehicles/:vehicleId/expenses', auth.checkManagerToken, controller.getExpensesForVehicle);

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
 * @apiUse notAuthorized
 */
router.get('/:managerId/vehicles/:vehicleId/expenses/:vehicleExpenseId', auth.checkManagerToken, controller.getExpenseById);

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
 * @apiParam (body){String} amount Expense amount
 * 
 * @apiSuccess {Number} HttpStatus 200 if everything is ok
 * @apiSuccess {Array} Expense Created expense
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
 * @apiUse notAuthorized
 */
router.post('/:managerId/vehicles/:vehicleId/expenses', auth.checkManagerToken, controller.addExpense);

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
 * @apiSuccess {Array} Expense Updated expense
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
router.put('/:managerId/vehicles/:vehicleId/expenses/:vehicleExpenseId', auth.checkManagerToken, controller.updateExpense);

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
router.delete('/:managerId/vehicles/:vehicleId/expenses/:vehicleExpenseId', auth.checkManagerToken, controller.deleteExpense);

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
router.put('/:managerId/vehicles/:vehicleId/extendRegistration', auth.checkManagerToken, controller.extendVehicleRegistration);

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
router.get('/:managerId/users', auth.checkManagerToken, controller.findAllUsers);

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
router.delete('/:managerId/users/:userId', auth.checkManagerToken, controller.deleteUser);

logger.info('loaded MANAGER routes');

module.exports = router;