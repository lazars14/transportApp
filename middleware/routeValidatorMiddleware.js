var validator       = require('request-validator'),
    validatorSchema = require('./../lib/validator/validators');

/**
 * validate incoming request passed parameters
 *
 * @param req
 * @param res
 * @param next
 */
module.exports = function (req, res, next) {
  console.log(req.method+'-'+req.originalUrl, req.body);
  var schema = validatorSchema.getSchema(req.originalUrl, req.method);
  if (schema.required && !schema.required.length) {
    delete schema.required;
  }
  
  var validate = validator(schema, function (req, res, next) {
    var e = false;
    if (!req.validator.valid) {
      console.log(schema);
      // console.log(req.validator.error);
      e = error('BAD_REQUEST', req.validator.error)
    }
    next(e);
  });
  validate(req, res, next);
};