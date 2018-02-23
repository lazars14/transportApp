var controller = require('./controller');
var express = require('express');
var auth = require('../../middleware/authMiddleware');
var router = express.Router();


/**
 * @api {post} /managers/login
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
 * @apiUse notAuthorized
 */
router.post('/managers/login', auth.checkManagerToken, controller.loginManager);

logger.info('loaded MANAGER routes');

module.exports = router;