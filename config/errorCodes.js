module.exports.codes = {
    'BAD_REQUEST': {
      code: '400',
      message: 'Bad request'
    },
    'FORBIDDEN': {
      code: '401',
      message: 'You are not authorized to access this URI'
    },
    'EXPIRED': {
      code: '403',
      message: 'Your session has expired, please re-login.'
    },
    'NOT_FOUND': {
      code: '404',
      message: 'Not found'
    },
    'NOT_ALLOWED': {
      code: '405',
      message: 'Not allowed'
    },
    'ALREADY_REGISTERED': {
      code: '406',
      message: 'You are already registered'
    },
    'INVALID_USERNAME_PASSWORD': {
      code: '409',
      message: 'Invalid username/password'
    },
    'SERVER_ERROR': {
      code: '500',
      message: 'Internal server error'
    },
  };