var controller = require('./controller');
var express = require('express');
var router = express.Router();

/**
 * @api {get} /client/{clientId}/managers
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
router.get('/client/:clientId/managers', controller.getAllManagers);

/**
 * @api {post} /client/{clientId}/managers
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
router.post('/client/:clientId/managers', controller.registerManager);

/**
 * @api {put} /client/{clientId}/managers/{managerId}
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
router.put('/client/:clientId/managers/:managerId', controller.updateManager);

/**
 * @api {delete} /client/{clientId}/managers/{managerId}
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
router.delete('/client/:clientId/managers/:managerId', controller.deleteManager);

/**
 * @api {get} /client/{clientId}/vehicles
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
router.get('/client/:clientId/vehicles', controller.getAllVehicles);

/**
 * @api {get} /client/{clientId}/vehicles/{vehicleId}
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
router.get('/client/:clientId/vehicles/:vehicleId', controller.getVehicleById);

/**
 * @api {post} /client/{clientId}/vehicles
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
router.post('/client/:clientId/vehicles', controller.addVehicle);

/**
 * @api {put} /client/{clientId}/vehicles/{vehicleId}
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
router.put('/client/:clientId/vehicles/:vehicleId', controller.updateVehicle);

/**
 * @api {delete} /client/{clientId}/vehicles/{vehicleId}
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
router.delete('/client/:clientId/vehicles/:vehicleId', controller.removeVehicle);
