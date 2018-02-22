//ERRORS

/**
 * @apiDefine badRequest
 * @apiVersion 1.0.0
 * @apiErrorExample Bad request:
 * HTTP/1.1 400 Bad request
 {
   "error": {
     "code": "400",
     "message": "Bad request"
   }
 }
 *
 */

/**
 * @apiDefine notAuthorized
 * @apiVersion 1.0.0
 * @apiErrorExample Not Authenticated:
 *     HTTP/1.1 401 Not Authenticated
     {
       "error": "No Access Right"
    }
 *
 */

/**
 * @apiDefine forbidden
 * @apiVersion 1.0.0
 * @apiErrorExample Forbidden:
 * HTTP/1.1 403 Forbidden
 {
   "error": {
     "code": "403",
     "message": "Forbidden"
   }
 }
 *
 */

/**
 * @apiDefine notFound
 * @apiVersion 1.0.0
 * @apiErrorExample Not Found:
 *     HTTP/1.1 404 Not Found
    {
      "error": "Not Found"
    }
 *
 */

/**
 * @apiDefine notAllowed
 * @apiVersion 0.1.0
 * @apiErrorExample Not allowed:
 * HTTP/1.1 405 Not allowed
 {
   "error": {
   "code": "405",
     "message": "Not allowed"
 }
 }
 *
 */

/**
 * @apiDefine alreadyRegistered
 * @apiVersion 1.0.0
 * @apiErrorExample Already registered:
 * HTTP/1.1 406 You are already registered
 {
   "error": {
     "code": "406",
     "message": "You are already registered"
   }
 }
 *
 */

/**
 * @apiDefine invalidCredentials
 * @apiVersion 1.0.0
 * @apiErrorExample Invalid username/password:
 * HTTP/1.1 409 Invalid username/password
 {
   "error": {
     "code": "409",
     "message": "Invalid username/password"
   }
 }
 *
 */

/**
 * @apiDefine internalError
 * @apiVersion 1.0.0
 * @apiErrorExample Internal server error:
 * HTTP/1.1 500 Internal server error
 {
   "error": {
     "code": "500",
     "message": "Internal server error"
   }
 }
 *
 */