var controller = require('./controller');
var express = require('express');
var auth = require('../../middleware/authMiddleware');
var router = express.Router();


/**
 * @api {post} /clients/login
 * Client Login
 * @apiVersion 1.0.0
 * @apiName Client Login
 * @apiGroup Client
 * @apiDescription Client login - login to account
 * 
 * @apiParam (body){String} email Client email
 * @apiParam (body){String} password Client password
 * 
 * @apiSuccess {Number} HttpStatus 200 if everything is ok
 * @apiSuccess {String} token Client token - expiration time one day
 * {
 *    "token": "23042016MSSSU2-032AE0AA"
 * }
 * 
 * @apiUse internalError
 * @apiUse notFound
 * @apiUse badRequest
 * @apiUse notAuthorized
 */
router.post('/clients/login', controller.loginClient);

/**
 * @api {put} /clients/{clientId}
 * Update Client Info
 * @apiVersion 1.0.0
 * @apiName Update Client
 * @apiGroup Client
 * @apiDescription Client update client - update client info
 * 
 * @apiParam (path){String} clientId Client id
 * 
 * @apiParam (body){String} [email] Client email
 * @apiParam (body){String} [password] Client password
 * @apiParam (body){String} [firstName] Client firstname
 * @apiParam (body){String} [lastName] Client lastname
 * @apiParam (body){String} [phone] Client phone
 * 
 * @apiSuccess {Number} HttpStatus 200 if everything is ok
 * @apiSuccess {Object} Client Updated client
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
router.put('/clients/:clientId', auth.checkClientToken, controller.updateClient);

/**
 * @api {get} /clients/{clientId}/managers
 * Get All Managers
 * @apiVersion 1.0.0
 * @apiName Get All Managers
 * @apiGroup Client
 * @apiDescription Client managers - view all managers
 * 
 * @apiParam (path){String} clientId Client id
 * 
 * @apiSuccess {Number} HttpStatus 200 if everything is ok
 * @apiSuccess {Array} Managers Managers array
 * [
 *        {
 *           "_id": "a-d.x-;s-39;x-s9-3la-fl2",
 *           "firstName": "John",
 *           "lastName": "Doe",
 *           "phone" : "060/123456",
 *           "email": "johndoe@gmail.com",
 *           "password": "a3-xjd=-s,;kfga=dg"
 *        },
 *        {
 *           "_id": "a-d.x-;s-39;x-s9-3la-213",
 *           "firstName": "Jane",
 *           "lastName": "Doe",
 *           "phone" : "060/123456",
 *           "email": "janedoe@gmail.com",
 *           "password": "a3-xjd=-swekfga=123"
 *        }
 * ]
 * 
 * @apiUse internalError
 * @apiUse notFound
 * @apiUse badRequest
 * @apiUse notAuthorized
 */
router.get('/clients/:clientId/managers', auth.checkClientToken, controller.getAllManagers);

/**
 * @api {post} /clients/{clientId}/managers
 * Add Manager
 * @apiVersion 1.0.0
 * @apiName Add Manager
 * @apiGroup Client
 * @apiDescription Client add manager - add new manager
 * 
 * @apiParam (path){String} clientId Client id
 * 
 * @apiParam (body){String} email Manager email
 * @apiParam (body){String} password Manager password
 * @apiParam (body){String} [firstName] Manager firstname
 * @apiParam (body){String} [lastName] Manager lastname
 * @apiParam (body){String} [phone] Manager phone
 * 
 * @apiSuccess {Number} HttpStatus 200 if everything is ok
 * @apiSuccess {Object} Manager Created manager
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
router.post('/clients/:clientId/managers', auth.checkClientToken, controller.registerManager);

/**
 * @api {put} /clients/{clientId}/managers/{managerId}
 * Update Manager
 * @apiVersion 1.0.0
 * @apiName Update Manager
 * @apiGroup Client
 * @apiDescription Client update manager - update existing manager
 * 
 * @apiParam (path){String} clientId Client id
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
router.put('/clients/:clientId/managers/:managerId', auth.checkClientToken, controller.updateManager);

/**
 * @api {delete} /clients/{clientId}/managers/{managerId}
 * Delete Manager
 * @apiVersion 1.0.0
 * @apiName Delete Manager
 * @apiGroup Client
 * @apiDescription Client delete manager - delete existing manager
 * 
 * @apiParam (path){String} clientId Client id
 * @apiParam (path){String} managerId Manager id
 * 
 * @apiSuccess {Number} HttpStatus 200 if everything is ok
 * @apiSuccess {Object} Manager Deleted manager
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
router.delete('/clients/:clientId/managers/:managerId', auth.checkClientToken, controller.deleteManager);

/**
 * @api {get} /clients/{clientId}/vehicles
 * Get All Vehicles
 * @apiVersion 1.0.0
 * @apiName Get All Vehicles
 * @apiGroup Client
 * @apiDescription Client vehicles - view all vehicles
 * 
 * @apiParam (path){String} clientId Client id
 * 
 * @apiSuccess {Number} HttpStatus 200 if everything is ok
 * @apiSuccess {Array} Vehicles Vehicles array
 * [
 *        {
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
 * @apiUse badRequest
 * @apiUse notAuthorized
 */
router.get('/clients/:clientId/vehicles', auth.checkClientToken, controller.getAllVehicles);

/**
 * @api {get} /clients/{clientId}/vehicles/{vehicleId}
 * Get Vehicle
 * @apiVersion 1.0.0
 * @apiName Get Vehicle
 * @apiGroup Client
 * @apiDescription Client get vehicle - get vehicle with specific id
 * 
 * @apiParam (path){String} clientId Client id
 * @apiParam (path){String} vehicleId Vehicle id
 * 
 * @apiSuccess {Number} HttpStatus 200 if everything is ok
 * @apiSuccess {Array} Vehicle Vehicle object
 * {
 *      "_id": "a-d.x-;s-39;x-s9-3la-fl2",
 *      "name": "First bus",
 *      "model": "Mercedes-Benz do Brasil",
 *      "licensePlate" : "NS-123-AD",
 *      "licenseExpireDate": "2019-10-21",
 *      "numberOfSeats": "50",
 *      "productionYear": "2015",
 *      "numberOfKmPassed": "50000"
 * }
 * 
 * @apiUse internalError
 * @apiUse notFound
 * @apiUse badRequest
 * @apiUse notAuthorized
 */
router.get('/clients/:clientId/vehicles/:vehicleId', auth.checkClientToken, controller.getVehicleById);

/**
 * @api {post} /clients/{clientId}/vehicles
 * Add Vehicle
 * @apiVersion 1.0.0
 * @apiName Add Vehicle
 * @apiGroup Client
 * @apiDescription Client add vehicle - add new vehicle
 * 
 * @apiParam (path){String} clientId Client id
 * 
 * @apiParam (body){String} licensePlate Vehicle license plate
 * @apiParam (body){String} licenseExpireDate Vehicle license expire date
 * @apiParam (body){String} numberOfSeats Vehicle number of seats
 * @apiParam (body){String} [name] Vehicle name
 * @apiParam (body){String} [model] Vehicle model
 * @apiParam (body){String} [productionYear] Vehicle production year
 * @apiParam (body){String} [numberOfKmPassed] Vehicle numberOfKmPassed
 * 
 * @apiSuccess {Number} HttpStatus 200 if everything is ok
 * @apiSuccess {Object} Manager Created vehicle
 * {
 *      "_id": "a-d.x-;s-39;x-s9-3la-fl2",
 *      "name": "First bus",
 *      "model": "Mercedes-Benz do Brasil",
 *      "licensePlate" : "NS-123-AD",
 *      "licenseExpireDate": "2019-10-21",
 *      "numberOfSeats": "50"
 *      "productionYear": "2015"
 *      "numberOfKmPassed": "50000"
 * }
 * 
 * @apiUse internalError
 * @apiUse notFound
 * @apiUse badRequest
 * @apiUse notAuthorized
 */
router.post('/clients/:clientId/vehicles', auth.checkClientToken, controller.addVehicle);

/**
 * @api {put} /clients/{clientId}/vehicles/{vehicleId}
 * Update Vehicle
 * @apiVersion 1.0.0
 * @apiName Update Vehicle
 * @apiGroup Client
 * @apiDescription Client update vehicle - update existing vehicle
 * 
 * @apiParam (path){String} clientId Client id
 * @apiParam (path){String} vehicleId Vehicle id
 * 
 * @apiParam (body){String} [licensePlate] Vehicle license plate
 * @apiParam (body){String} [licenseExpireDate] Vehicle license expire date
 * @apiParam (body){String} [numberOfSeats] Vehicle number of seats
 * @apiParam (body){String} [name] Vehicle name
 * @apiParam (body){String} [model] Vehicle model
 * @apiParam (body){String} [productionYear] Vehicle production year
 * @apiParam (body){String} [numberOfKmPassed] Vehicle numberOfKmPassed
 * 
 * @apiSuccess {Number} HttpStatus 200 if everything is ok
 * @apiSuccess {Object} Vehicle Updated vehicle
 * {
 *      "_id": "a-d.x-;s-39;x-s9-3la-fl2",
 *      "name": "First bus",
 *      "model": "Mercedes-Benz do Brasil",
 *      "licensePlate" : "NS-123-AD",
 *      "licenseExpireDate": "2019-10-21",
 *      "numberOfSeats": "50"
 *      "productionYear": "2015"
 *      "numberOfKmPassed": "50000"
 * }
 * 
 * @apiUse internalError
 * @apiUse notFound
 * @apiUse badRequest
 * @apiUse notAuthorized
 */
router.put('/clients/:clientId/vehicles/:vehicleId', auth.checkClientToken, controller.updateVehicle);

/**
 * @api {delete} /clients/{clientId}/vehicles/{vehicleId}
 * Delete Vehicle
 * @apiVersion 1.0.0
 * @apiName Delete Vehicle
 * @apiGroup Client
 * @apiDescription Client delete vehicle - delete existing vehicle
 * 
 * @apiParam (path){String} clientId Client id
 * @apiParam (path){String} vehicleId Vehicle id
 * 
 * @apiSuccess {Number} HttpStatus 200 if everything is ok
 * @apiSuccess {Object} Vehicle Deleted vehicle
 * {
 *      "_id": "a-d.x-;s-39;x-s9-3la-fl2",
 *      "name": "First bus",
 *      "model": "Mercedes-Benz do Brasil",
 *      "licensePlate" : "NS-123-AD",
 *      "licenseExpireDate": "2019-10-21",
 *      "numberOfSeats": "50"
 *      "productionYear": "2015"
 *      "numberOfKmPassed": "50000"
 * }
 * 
 * @apiUse internalError
 * @apiUse notFound
 * @apiUse badRequest
 * @apiUse notAuthorized
 */
router.delete('/clients/:clientId/vehicles/:vehicleId', auth.checkClientToken, controller.removeVehicle);

logger.info('loaded CLIENT routes');

module.exports = router;
