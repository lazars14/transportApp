var config = {
    env: 'test',
    server: 'http://localhost:3000',
    token: {
      secret: '123&$&*!010293123mxan!#'
    },
    logger: {
      path: './log/server.log'
    },
    mongodb: {
      host: "mongodb://localhost:27017/",
      db: "transportApp_test",
      debug: false
    },
    "serverURL": "http://localhost:9000"
  };
  
  module.exports = config;