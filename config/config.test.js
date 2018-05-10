var config = {
    env: 'test',
    server: 'http://localhost:3000',
    token: {
      secret: '123&$&*!010293123mxan!#'
    },
    firebaseServerKey: 'AIzaSyDiiYDU2ySFY7rpXMmd3rSIqYgHDGI7kVI',
    logger: {
      path: './log/server.log'
    },
    log: {
      "level" : "info",
      "json" : false,
      "logsToFile" : true,
      "fileLogParams" : {
        "folder" : "log",
        "prefix" : "transportApp_test",
        "datePattern" : "yyyy_MM_dd",
        "extension" : "log",
        "keepLogsDays" : 3
      },
      "logsToDatabase": false
    },
    mongodb: {
      host: "mongodb://localhost:27017/",
      db: "transportApp_test",
      debug: false
    },
    "serverURL": "http://localhost:9000"
  };
  
  module.exports = config;