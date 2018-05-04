var controller = require('./controller');
var express = require('express');
var auth = require('../../middleware/authMiddleware');
var router = express.Router();


/**
 * @api {post} /register
 * Register user
 * @apiVersion 1.0.0
 * @apiName Register User
 * @apiGroup User
 * @apiDescription User register - register user account
 * 
 * @apiParam (body){String} email Manager email
 * @apiParam (body){String} password Manager password
 * @apiParam (body){String} [firstName] Manager firstname
 * @apiParam (body){String} [lastName] Manager lastname
 * @apiParam (body){String} [phone] Manager phone
 * 
 * @apiSuccess {Number} HttpStatus 200 if everything is ok
 * @apiSuccess {Object} User Created user
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
 * @apiUse alreadyRegistered
 * @apiUse badRequest
 */
router.post('/register', controller.registerUser);

/**
 * @api {post} /login
 * User Login
 * @apiVersion 1.0.0
 * @apiName User Login
 * @apiGroup User
 * @apiDescription User login - login to account
 * 
 * @apiParam (body){String} email User email
 * @apiParam (body){String} password User password
 * 
 * @apiSuccess {Number} HttpStatus 200 if everything is ok
 * @apiSuccess {String} token User token - expiration time one day
 * {
 *    "token": "23042016MSSSU2-032AE0AA"
 * }
 * 
 * @apiUse internalError
 * @apiUse badRequest
 * @apiUse invalidCredentials
 */
router.post('/login', controller.loginUser);

/**
 * @api {post} /{userId}/requests
 * User Add Request
 * @apiVersion 1.0.0
 * @apiName User Add Request
 * @apiGroup User
 * @apiDescription User add request - create new request
 * 
 * @apiParam (path){String} userId User id
 * 
 * @apiParam (body){Object} startLocation Vehicle license plate
 * @apiParam (body){Object} endLocation Vehicle license expire date
 * 
 * @apiSuccess {Number} HttpStatus 200 if everything is ok
 * @apiSuccess {Object} DestinationRequest Created request
 * {
 *      "_id": "a-d.x-;s-39;x-s9-3la-fl2",
 *      "status": "submitted",
 *      "submissionDate": "2018-03-01",
 *      "startLocation" : {
 *          "latitude": "45.30",
 *          "longitude": "45.30"
 *      },
 *      "endLocation": {
 *          "latitude": "45.31",
 *          "longitude": "45.31"
 *      },
 *      "userId": "asdf32-sdfa032-asdfsa"
 * }
 * 
 * @apiUse internalError
 * @apiUse badRequest
 * @apiUse notFound
 * @apiUse notAuthorized
 */
router.post('/:userId/requests', auth.checkUserToken, auth.checkUserId, controller.addRequest);

/**
 * @api {get} /{userId}/requests
 * User Requests
 * @apiVersion 1.0.0
 * @apiName User Requests
 * @apiGroup User
 * @apiDescription User get all requests - get all requests for specific user
 * 
 * @apiParam (path){String} userId User id
 * 
 * @apiSuccess {Number} HttpStatus 200 if everything is ok
 * @apiSuccess {Array} DestinationRequests Requests for user
 * [
 *      {
 *          "_id": "a-d.x-;s-39;x-s9-3la-fl2",
 *          "status": "submitted",
 *          "submissionDate": "2018-03-01",
 *          "startLocation" : {
 *              "latitude": "45.30",
 *              "longitude": "45.30"
 *          },
 *          "endLocation": {
 *              "latitude": "45.31",
 *              "longitude": "45.31"
 *          },
 *          "userId": "asdf32-sdfa032-asdfsa"
 *      },
 *      {
 *          "_id": "add.x-;s-39;x-s9-3la-ab3",
 *          "status": "submitted",
 *          "submissionDate": "2018-03-01",
 *          "startLocation" : {
 *              "latitude": "45.32",
 *              "longitude": "45.32"
 *          },
 *          "endLocation": {
 *              "latitude": "45.33",
 *              "longitude": "45.33"
 *          },
 *          "userId": "asdf32-sdfa032-asdfsa"
 *      }
 * ]
 * 
 * @apiUse internalError
 * @apiUse notFound
 * @apiUse notAuthorized
 */
router.get('/:userId/requests', auth.checkUserToken, auth.checkUserId, controller.userRequests);

/**
 * @api {put} /{userId}/changePassword
 * User Change Password
 * @apiVersion 1.0.0
 * @apiName User Change Password
 * @apiGroup User
 * @apiDescription User change password - change existing password
 * 
 * @apiParam (path){String} userId User id
 * 
 * @apiParam (body){String} oldPassword User's old password
 * @apiParam (body){String} newPassword User's new password
 * @apiParam (body){String} repeatPassword User's new rpassword repeated
 * 
 * @apiSuccess {Number} HttpStatus 200 if everything is ok
 * 
 * @apiUse internalError
 * @apiUse badRequest
 * @apiUse notAuthorized
 * @apiUse notAllowed
 * @apiUse notFound
 */
router.put('/:userId/changePassword', auth.checkUserToken, auth.checkUserId, controller.changePassword);

/**
 * @api {put} /{userId}/changeEmail
 * User Change Email
 * @apiVersion 1.0.0
 * @apiName User Change Password
 * @apiGroup User
 * @apiDescription User change password - change existing password
 * 
 * @apiParam (path){String} userId User id
 * 
 * @apiParam (body){String} oldEmail User's old email
 * @apiParam (body){String} newEmail User's new email
 *  
 * @apiSuccess {Number} HttpStatus 200 if everything is ok
 * 
 * @apiUse internalError
 * @apiUse badRequest
 * @apiUse notAuthorized
 * @apiUse notAllowed
 * @apiUse notFound
 */
router.put('/:userId/changeEmail', auth.checkUserToken, auth.checkUserId, controller.changeEmail);

/**
 * @api {put} /{userId}
 * User Update Info
 * @apiVersion 1.0.0
 * @apiName User Update Info
 * @apiGroup User
 * @apiDescription User update info - update personal info
 * 
 * @apiParam (path){String} userId User id
 * 
 * @apiParam (body){String} firstName User's firstname
 * @apiParam (body){String} lastName User's lastname
 * @apiParam (body){String} address User's address
 * @apiParam (body){String} phone User's phone
 *  
 * @apiSuccess {Number} HttpStatus 200 if everything is ok
 * 
 * @apiUse internalError
 * @apiUse badRequest
 * @apiUse notAuthorized
 * @apiUse notFound
 */
router.put('/:userId', auth.checkUserToken, auth.checkUserId, controller.updateInfo);

/**
 * @api {put} /{userId}/requests/{destinationRequestId}/accept
 * User Accept Request
 * @apiVersion 1.0.0
 * @apiName User Accept Request
 * @apiGroup User
 * @apiDescription User accept request - accept user request
 * 
 * @apiParam (path){String} userId User id
 * @apiParam (path){String} destinationRequestId Request id
 *  
 * @apiSuccess {Number} HttpStatus 200 if everything is ok
 * 
 * @apiUse internalError
 * @apiUse badRequest
 * @apiUse notAuthorized
 * @apiUse notFound
 * @apiUse notAllowed
 */
router.put('/:userId/requests/:destinationRequestId/accept', auth.checkUserToken, auth.checkUserId, controller.requestAccept);

/**
 * @api {put} /{userId}/requests/{destinationRequestId}/reject
 * User Reject Request
 * @apiVersion 1.0.0
 * @apiName User Reject Request
 * @apiGroup User
 * @apiDescription User reject request - reject user request
 * 
 * @apiParam (path){String} userId User id
 * @apiParam (path){String} destinationRequestId Request id
 *  
 * @apiSuccess {Number} HttpStatus 200 if everything is ok
 * 
 * @apiUse internalError
 * @apiUse badRequest
 * @apiUse notAuthorized
 * @apiUse notFound
 */
router.put('/:userId/requests/:destinationRequestId/reject', auth.checkUserToken, auth.checkUserId, controller.requestReject);

logger.info('loaded USER routes');

module.exports = router;
