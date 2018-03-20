define({ "api": [
  {
    "type": "post",
    "url": "/{clientId}/drivers",
    "title": "Add Driver",
    "version": "1.0.0",
    "name": "Add_Driver",
    "group": "Client",
    "description": "<p>Client add driver - add new driver</p>",
    "parameter": {
      "fields": {
        "path": [
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "clientId",
            "description": "<p>Client id</p>"
          }
        ],
        "body": [
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>Driver firstname</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>Driver lastname</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Driver email</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>Driver phone</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": true,
            "field": "address",
            "description": "<p>Driver address</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "HttpStatus",
            "description": "<p>200 if everything is ok</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Driver",
            "description": "<p>Created driver { &quot;_id&quot;: &quot;a-d.x-;flow1-s9-3la-aswsq&quot;, &quot;firstName&quot;: &quot;Driver&quot;, &quot;lastName&quot;: &quot;Three&quot;, &quot;email&quot; : &quot;driverthree@gmail.com&quot;, &quot;phone&quot;: &quot;0600345678&quot;, &quot;address&quot;: &quot;St. Joseph's Boulevard 50&quot; }</p>"
          }
        ]
      }
    },
    "filename": "services/module_client/router.js",
    "groupTitle": "Client",
    "error": {
      "examples": [
        {
          "title": "Internal server error:",
          "content": "HTTP/1.1 500 Internal server error\n {\n   \"error\": {\n     \"code\": \"500\",\n     \"message\": \"Internal server error\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Bad request:",
          "content": "HTTP/1.1 400 Bad request\n {\n   \"error\": {\n     \"code\": \"400\",\n     \"message\": \"Bad request\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Not Authenticated:",
          "content": "HTTP/1.1 401 Not Authenticated\n {\n   \"error\": \"No Access Right\"\n}",
          "type": "json"
        },
        {
          "title": "Already registered:",
          "content": "HTTP/1.1 406 You are already registered\n {\n   \"error\": {\n     \"code\": \"406\",\n     \"message\": \"You are already registered\"\n   }\n }",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/{clientId}/managers",
    "title": "Add Manager",
    "version": "1.0.0",
    "name": "Add_Manager",
    "group": "Client",
    "description": "<p>Client add manager - add new manager</p>",
    "parameter": {
      "fields": {
        "path": [
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "clientId",
            "description": "<p>Client id</p>"
          }
        ],
        "body": [
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Manager email</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Manager password</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>Manager firstname</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>Manager lastname</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": true,
            "field": "phone",
            "description": "<p>Manager phone</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "HttpStatus",
            "description": "<p>200 if everything is ok</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Manager",
            "description": "<p>Created manager { &quot;_id&quot;: &quot;a-d.x-;s-39;x-s9-3la-fl2&quot;, &quot;firstName&quot;: &quot;John&quot;, &quot;lastName&quot;: &quot;Doe&quot;, &quot;phone&quot;: &quot;060/123456&quot;, &quot;email&quot;: &quot;johndoe@gmail.com&quot;, &quot;password&quot;: &quot;a3-xjd=-s,;kfga=dg&quot; }</p>"
          }
        ]
      }
    },
    "filename": "services/module_client/router.js",
    "groupTitle": "Client",
    "error": {
      "examples": [
        {
          "title": "Internal server error:",
          "content": "HTTP/1.1 500 Internal server error\n {\n   \"error\": {\n     \"code\": \"500\",\n     \"message\": \"Internal server error\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Bad request:",
          "content": "HTTP/1.1 400 Bad request\n {\n   \"error\": {\n     \"code\": \"400\",\n     \"message\": \"Bad request\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Not Found\"\n}",
          "type": "json"
        },
        {
          "title": "Not Authenticated:",
          "content": "HTTP/1.1 401 Not Authenticated\n {\n   \"error\": \"No Access Right\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/{clientId}/vehicles",
    "title": "Add Vehicle",
    "version": "1.0.0",
    "name": "Add_Vehicle",
    "group": "Client",
    "description": "<p>Client add vehicle - add new vehicle</p>",
    "parameter": {
      "fields": {
        "path": [
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "clientId",
            "description": "<p>Client id</p>"
          }
        ],
        "body": [
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "licensePlate",
            "description": "<p>Vehicle license plate</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "licenseExpireDate",
            "description": "<p>Vehicle license expire date</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "numberOfSeats",
            "description": "<p>Vehicle number of seats</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Vehicle name</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Vehicle model</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": true,
            "field": "productionYear",
            "description": "<p>Vehicle production year</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": true,
            "field": "numberOfKmPassed",
            "description": "<p>Vehicle numberOfKmPassed</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "HttpStatus",
            "description": "<p>200 if everything is ok</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Manager",
            "description": "<p>Created vehicle { &quot;_id&quot;: &quot;a-d.x-;s-39;x-s9-3la-fl2&quot;, &quot;name&quot;: &quot;First bus&quot;, &quot;model&quot;: &quot;Mercedes-Benz do Brasil&quot;, &quot;licensePlate&quot; : &quot;NS-123-AD&quot;, &quot;licenseExpireDate&quot;: &quot;2019-10-21&quot;, &quot;numberOfSeats&quot;: &quot;50&quot;, &quot;productionYear&quot;: &quot;2015&quot;, &quot;numberOfKmPassed&quot;: &quot;50000&quot; }</p>"
          }
        ]
      }
    },
    "filename": "services/module_client/router.js",
    "groupTitle": "Client",
    "error": {
      "examples": [
        {
          "title": "Internal server error:",
          "content": "HTTP/1.1 500 Internal server error\n {\n   \"error\": {\n     \"code\": \"500\",\n     \"message\": \"Internal server error\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Bad request:",
          "content": "HTTP/1.1 400 Bad request\n {\n   \"error\": {\n     \"code\": \"400\",\n     \"message\": \"Bad request\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Not Found\"\n}",
          "type": "json"
        },
        {
          "title": "Not Authenticated:",
          "content": "HTTP/1.1 401 Not Authenticated\n {\n   \"error\": \"No Access Right\"\n}",
          "type": "json"
        },
        {
          "title": "Already registered:",
          "content": "HTTP/1.1 406 You are already registered\n {\n   \"error\": {\n     \"code\": \"406\",\n     \"message\": \"You are already registered\"\n   }\n }",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/login",
    "title": "Client Login",
    "version": "1.0.0",
    "name": "Client_Login",
    "group": "Client",
    "description": "<p>Client login - login to account</p>",
    "parameter": {
      "fields": {
        "body": [
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Client email</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Client password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "HttpStatus",
            "description": "<p>200 if everything is ok</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Client token - expiration time one day { &quot;token&quot;: &quot;23042016MSSSU2-032AE0AA&quot; }</p>"
          }
        ]
      }
    },
    "filename": "services/module_client/router.js",
    "groupTitle": "Client",
    "error": {
      "examples": [
        {
          "title": "Internal server error:",
          "content": "HTTP/1.1 500 Internal server error\n {\n   \"error\": {\n     \"code\": \"500\",\n     \"message\": \"Internal server error\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Bad request:",
          "content": "HTTP/1.1 400 Bad request\n {\n   \"error\": {\n     \"code\": \"400\",\n     \"message\": \"Bad request\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Invalid username/password:",
          "content": "HTTP/1.1 409 Invalid username/password\n {\n   \"error\": {\n     \"code\": \"409\",\n     \"message\": \"Invalid username/password\"\n   }\n }",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/{clientId}/drivers/{driverId}",
    "title": "Delete Driver",
    "version": "1.0.0",
    "name": "Delete_Driver",
    "group": "Client",
    "description": "<p>Client delete driver - delete existing driver</p>",
    "parameter": {
      "fields": {
        "path": [
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "clientId",
            "description": "<p>Client id</p>"
          },
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "driverId",
            "description": "<p>Driver id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "HttpStatus",
            "description": "<p>200 if everything is ok</p>"
          }
        ]
      }
    },
    "filename": "services/module_client/router.js",
    "groupTitle": "Client",
    "error": {
      "examples": [
        {
          "title": "Internal server error:",
          "content": "HTTP/1.1 500 Internal server error\n {\n   \"error\": {\n     \"code\": \"500\",\n     \"message\": \"Internal server error\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Not Found\"\n}",
          "type": "json"
        },
        {
          "title": "Not Authenticated:",
          "content": "HTTP/1.1 401 Not Authenticated\n {\n   \"error\": \"No Access Right\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/{clientId}/managers/{managerId}",
    "title": "Delete Manager",
    "version": "1.0.0",
    "name": "Delete_Manager",
    "group": "Client",
    "description": "<p>Client delete manager - delete existing manager</p>",
    "parameter": {
      "fields": {
        "path": [
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "clientId",
            "description": "<p>Client id</p>"
          },
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "managerId",
            "description": "<p>Manager id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "HttpStatus",
            "description": "<p>200 if everything is ok</p>"
          }
        ]
      }
    },
    "filename": "services/module_client/router.js",
    "groupTitle": "Client",
    "error": {
      "examples": [
        {
          "title": "Internal server error:",
          "content": "HTTP/1.1 500 Internal server error\n {\n   \"error\": {\n     \"code\": \"500\",\n     \"message\": \"Internal server error\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Not Found\"\n}",
          "type": "json"
        },
        {
          "title": "Not Authenticated:",
          "content": "HTTP/1.1 401 Not Authenticated\n {\n   \"error\": \"No Access Right\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/{clientId}/vehicles/{vehicleId}",
    "title": "Delete Vehicle",
    "version": "1.0.0",
    "name": "Delete_Vehicle",
    "group": "Client",
    "description": "<p>Client delete vehicle - delete existing vehicle</p>",
    "parameter": {
      "fields": {
        "path": [
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "clientId",
            "description": "<p>Client id</p>"
          },
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "vehicleId",
            "description": "<p>Vehicle id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "HttpStatus",
            "description": "<p>200 if everything is ok</p>"
          }
        ]
      }
    },
    "filename": "services/module_client/router.js",
    "groupTitle": "Client",
    "error": {
      "examples": [
        {
          "title": "Internal server error:",
          "content": "HTTP/1.1 500 Internal server error\n {\n   \"error\": {\n     \"code\": \"500\",\n     \"message\": \"Internal server error\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Not Found\"\n}",
          "type": "json"
        },
        {
          "title": "Not Authenticated:",
          "content": "HTTP/1.1 401 Not Authenticated\n {\n   \"error\": \"No Access Right\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/{clientId}/drivers",
    "title": "Get All Drivers",
    "version": "1.0.0",
    "name": "Get_All_Drivers",
    "group": "Client",
    "description": "<p>Client drivers - view all drivers</p>",
    "parameter": {
      "fields": {
        "path": [
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "clientId",
            "description": "<p>Client id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "HttpStatus",
            "description": "<p>200 if everything is ok</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "Drivers",
            "description": "<p>Drivers array [ { &quot;_id&quot;: &quot;a-d.x-;s-39;x-s9-3la-fl2&quot;, &quot;firstName&quot;: &quot;Driver&quot;, &quot;lastName&quot;: &quot;One&quot;, &quot;email&quot; : &quot;driverone@gmail.com&quot;, &quot;phone&quot;: &quot;0600123456&quot;, &quot;address&quot;: &quot;St. Joseph's Boulevard 50&quot; }, { &quot;_id&quot;: &quot;a-d.x-;flow1-s9-3la-aswsq&quot;, &quot;firstName&quot;: &quot;Driver&quot;, &quot;lastName&quot;: &quot;Two&quot;, &quot;email&quot; : &quot;drivertwo@gmail.com&quot;, &quot;phone&quot;: &quot;0600234567&quot;, &quot;address&quot;: &quot;St. Joseph's Boulevard 50&quot; } ]</p>"
          }
        ]
      }
    },
    "filename": "services/module_client/router.js",
    "groupTitle": "Client",
    "error": {
      "examples": [
        {
          "title": "Internal server error:",
          "content": "HTTP/1.1 500 Internal server error\n {\n   \"error\": {\n     \"code\": \"500\",\n     \"message\": \"Internal server error\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Not Found\"\n}",
          "type": "json"
        },
        {
          "title": "Not Authenticated:",
          "content": "HTTP/1.1 401 Not Authenticated\n {\n   \"error\": \"No Access Right\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/{clientId}/vehicles/{vehicleId}/expenses",
    "title": "Get All Expenses For Vehicle",
    "version": "1.0.0",
    "name": "Get_All_Expenses_For_Vehicle",
    "group": "Client",
    "description": "<p>CLient get all vehicle expenses - get all expenses for specific vehicle</p>",
    "parameter": {
      "fields": {
        "path": [
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "clientId",
            "description": "<p>Client id</p>"
          },
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "vehicleId",
            "description": "<p>Vehicle id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "HttpStatus",
            "description": "<p>200 if everything is ok</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "Expenses",
            "description": "<p>All expenses for vehicle [ { &quot;_id&quot;: &quot;a-d.x-;s-39;x-s9-3la-fl2&quot;, &quot;name&quot;: &quot;firstExpense&quot;, &quot;amount&quot;: &quot;1000.00&quot;, &quot;vehicleId&quot; : &quot;awadx-;s-39;x-s9-3la-fff&quot;, &quot;date&quot;: &quot;2018-03-01&quot; }, { &quot;_id&quot;: &quot;aas-;s-39;x-s9-3la-fwirw&quot;, &quot;name&quot;: &quot;secondExpense&quot;, &quot;amount&quot;: &quot;1500.00&quot;, &quot;vehicleId&quot; : &quot;awadx-;s-39;x-s9-3la-fff&quot;, &quot;date&quot;: &quot;2018-03-01&quot; }, ]</p>"
          }
        ]
      }
    },
    "filename": "services/module_client/router.js",
    "groupTitle": "Client",
    "error": {
      "examples": [
        {
          "title": "Internal server error:",
          "content": "HTTP/1.1 500 Internal server error\n {\n   \"error\": {\n     \"code\": \"500\",\n     \"message\": \"Internal server error\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Not Found\"\n}",
          "type": "json"
        },
        {
          "title": "Not Authenticated:",
          "content": "HTTP/1.1 401 Not Authenticated\n {\n   \"error\": \"No Access Right\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/{clientId}/managers",
    "title": "Get All Managers",
    "version": "1.0.0",
    "name": "Get_All_Managers",
    "group": "Client",
    "description": "<p>Client managers - view all managers</p>",
    "parameter": {
      "fields": {
        "path": [
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "clientId",
            "description": "<p>Client id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "HttpStatus",
            "description": "<p>200 if everything is ok</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "Managers",
            "description": "<p>Managers array [ { &quot;_id&quot;: &quot;a-d.x-;s-39;x-s9-3la-fl2&quot;, &quot;firstName&quot;: &quot;John&quot;, &quot;lastName&quot;: &quot;Doe&quot;, &quot;phone&quot; : &quot;060/123456&quot;, &quot;email&quot;: &quot;johndoe@gmail.com&quot;, &quot;password&quot;: &quot;a3-xjd=-s,;kfga=dg&quot; }, { &quot;_id&quot;: &quot;a-d.x-;s-39;x-s9-3la-213&quot;, &quot;firstName&quot;: &quot;Jane&quot;, &quot;lastName&quot;: &quot;Doe&quot;, &quot;phone&quot; : &quot;060/123456&quot;, &quot;email&quot;: &quot;janedoe@gmail.com&quot;, &quot;password&quot;: &quot;a3-xjd=-swekfga=123&quot; } ]</p>"
          }
        ]
      }
    },
    "filename": "services/module_client/router.js",
    "groupTitle": "Client",
    "error": {
      "examples": [
        {
          "title": "Internal server error:",
          "content": "HTTP/1.1 500 Internal server error\n {\n   \"error\": {\n     \"code\": \"500\",\n     \"message\": \"Internal server error\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Not Found\"\n}",
          "type": "json"
        },
        {
          "title": "Not Authenticated:",
          "content": "HTTP/1.1 401 Not Authenticated\n {\n   \"error\": \"No Access Right\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/{clientId}/vehicles",
    "title": "Get All Vehicles",
    "version": "1.0.0",
    "name": "Get_All_Vehicles",
    "group": "Client",
    "description": "<p>Client vehicles - view all vehicles</p>",
    "parameter": {
      "fields": {
        "path": [
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "clientId",
            "description": "<p>Client id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "HttpStatus",
            "description": "<p>200 if everything is ok</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "Vehicles",
            "description": "<p>Vehicles array [ { &quot;_id&quot;: &quot;a-d.x-;s-39;x-s9-3la-fl2&quot;, &quot;name&quot;: &quot;First bus&quot;, &quot;model&quot;: &quot;Mercedes-Benz do Brasil&quot;, &quot;licensePlate&quot; : &quot;NS-123-AD&quot;, &quot;licenseExpireDate&quot;: &quot;2019-10-21&quot;, &quot;numberOfSeats&quot;: &quot;50&quot;, &quot;productionYear&quot;: &quot;2015&quot;, &quot;numberOfKmPassed&quot;: &quot;50000&quot; }, { &quot;_id&quot;: &quot;add.x-;s-39;x-s9-3la-awe&quot;, &quot;name&quot;: &quot;Second bus&quot;, &quot;model&quot;: &quot;Mercedes-Benz do Brasil&quot;, &quot;licensePlate&quot; : &quot;NS-456-BC&quot;, &quot;licenseExpireDate&quot;: &quot;2019-10-21&quot;, &quot;numberOfSeats&quot;: &quot;50&quot;, &quot;productionYear&quot;: &quot;2015&quot;, &quot;numberOfKmPassed&quot;: &quot;55000&quot; } ]</p>"
          }
        ]
      }
    },
    "filename": "services/module_client/router.js",
    "groupTitle": "Client",
    "error": {
      "examples": [
        {
          "title": "Internal server error:",
          "content": "HTTP/1.1 500 Internal server error\n {\n   \"error\": {\n     \"code\": \"500\",\n     \"message\": \"Internal server error\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Not Found\"\n}",
          "type": "json"
        },
        {
          "title": "Not Authenticated:",
          "content": "HTTP/1.1 401 Not Authenticated\n {\n   \"error\": \"No Access Right\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/{clientId}/drivers/{driverId}",
    "title": "Get Driver By Id",
    "version": "1.0.0",
    "name": "Get_Driver_By_Id",
    "group": "Client",
    "description": "<p>Client get driver - get driver with specific id</p>",
    "parameter": {
      "fields": {
        "path": [
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "clientId",
            "description": "<p>Client id</p>"
          },
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "driverId",
            "description": "<p>Driver id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "HttpStatus",
            "description": "<p>200 if everything is ok</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "Driver",
            "description": "<p>Driver object { &quot;_id&quot;: &quot;a-d.x-;flow1-s9-3la-aswsq&quot;, &quot;firstName&quot;: &quot;Driver&quot;, &quot;lastName&quot;: &quot;Two&quot;, &quot;email&quot; : &quot;drivertwo@gmail.com&quot;, &quot;phone&quot;: &quot;0600234567&quot;, &quot;address&quot;: &quot;St. Joseph's Boulevard 50&quot; }</p>"
          }
        ]
      }
    },
    "filename": "services/module_client/router.js",
    "groupTitle": "Client",
    "error": {
      "examples": [
        {
          "title": "Internal server error:",
          "content": "HTTP/1.1 500 Internal server error\n {\n   \"error\": {\n     \"code\": \"500\",\n     \"message\": \"Internal server error\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Not Found\"\n}",
          "type": "json"
        },
        {
          "title": "Not Authenticated:",
          "content": "HTTP/1.1 401 Not Authenticated\n {\n   \"error\": \"No Access Right\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/{clientId}/managers/{managerId}",
    "title": "Get Manager By Id",
    "version": "1.0.0",
    "name": "Get_Manager_By_Id",
    "group": "Client",
    "description": "<p>Client get manager - get manager by id</p>",
    "parameter": {
      "fields": {
        "path": [
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "clientId",
            "description": "<p>Client id</p>"
          },
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "managerId",
            "description": "<p>Manager id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "HttpStatus",
            "description": "<p>200 if everything is ok</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "Manager",
            "description": "<p>Manager object { &quot;_id&quot;: &quot;a-d.x-;s-39;x-s9-3la-fl2&quot;, &quot;firstName&quot;: &quot;John&quot;, &quot;lastName&quot;: &quot;Doe&quot;, &quot;phone&quot; : &quot;060/123456&quot;, &quot;email&quot;: &quot;johndoe@gmail.com&quot;, &quot;password&quot;: &quot;a3-xjd=-s,;kfga=dg&quot; }</p>"
          }
        ]
      }
    },
    "filename": "services/module_client/router.js",
    "groupTitle": "Client",
    "error": {
      "examples": [
        {
          "title": "Internal server error:",
          "content": "HTTP/1.1 500 Internal server error\n {\n   \"error\": {\n     \"code\": \"500\",\n     \"message\": \"Internal server error\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Not Found\"\n}",
          "type": "json"
        },
        {
          "title": "Not Authenticated:",
          "content": "HTTP/1.1 401 Not Authenticated\n {\n   \"error\": \"No Access Right\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/{clientId}/vehicles/{vehicleId}",
    "title": "Get Vehicle By Id",
    "version": "1.0.0",
    "name": "Get_Vehicle_By_Id",
    "group": "Client",
    "description": "<p>Client get vehicle - get vehicle with specific id</p>",
    "parameter": {
      "fields": {
        "path": [
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "clientId",
            "description": "<p>Client id</p>"
          },
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "vehicleId",
            "description": "<p>Vehicle id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "HttpStatus",
            "description": "<p>200 if everything is ok</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "Vehicle",
            "description": "<p>Vehicle object { &quot;_id&quot;: &quot;a-d.x-;s-39;x-s9-3la-fl2&quot;, &quot;name&quot;: &quot;First bus&quot;, &quot;model&quot;: &quot;Mercedes-Benz do Brasil&quot;, &quot;licensePlate&quot; : &quot;NS-123-AD&quot;, &quot;licenseExpireDate&quot;: &quot;2019-10-21&quot;, &quot;numberOfSeats&quot;: &quot;50&quot;, &quot;productionYear&quot;: &quot;2015&quot;, &quot;numberOfKmPassed&quot;: &quot;50000&quot; }</p>"
          }
        ]
      }
    },
    "filename": "services/module_client/router.js",
    "groupTitle": "Client",
    "error": {
      "examples": [
        {
          "title": "Internal server error:",
          "content": "HTTP/1.1 500 Internal server error\n {\n   \"error\": {\n     \"code\": \"500\",\n     \"message\": \"Internal server error\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Not Found\"\n}",
          "type": "json"
        },
        {
          "title": "Not Authenticated:",
          "content": "HTTP/1.1 401 Not Authenticated\n {\n   \"error\": \"No Access Right\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/{clientId}",
    "title": "Update Client Info",
    "version": "1.0.0",
    "name": "Update_Client",
    "group": "Client",
    "description": "<p>Client update client - update client info</p>",
    "parameter": {
      "fields": {
        "path": [
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "clientId",
            "description": "<p>Client id</p>"
          }
        ],
        "body": [
          {
            "group": "body",
            "type": "String",
            "optional": true,
            "field": "email",
            "description": "<p>Client email</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": true,
            "field": "password",
            "description": "<p>Client password</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": true,
            "field": "firstName",
            "description": "<p>Client firstname</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": true,
            "field": "lastName",
            "description": "<p>Client lastname</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": true,
            "field": "phone",
            "description": "<p>Client phone</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "HttpStatus",
            "description": "<p>200 if everything is ok</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Client",
            "description": "<p>Updated client { &quot;_id&quot;: &quot;a-d.x-;s-39;x-s9-3la-fl2&quot;, &quot;firstName&quot;: &quot;John&quot;, &quot;lastName&quot;: &quot;Doe&quot;, &quot;phone&quot;: &quot;060/123456&quot;, &quot;email&quot;: &quot;johndoe@gmail.com&quot;, &quot;password&quot;: &quot;a3-xjd=-s,;kfga=dg&quot; }</p>"
          }
        ]
      }
    },
    "filename": "services/module_client/router.js",
    "groupTitle": "Client",
    "error": {
      "examples": [
        {
          "title": "Internal server error:",
          "content": "HTTP/1.1 500 Internal server error\n {\n   \"error\": {\n     \"code\": \"500\",\n     \"message\": \"Internal server error\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Not Found\"\n}",
          "type": "json"
        },
        {
          "title": "Bad request:",
          "content": "HTTP/1.1 400 Bad request\n {\n   \"error\": {\n     \"code\": \"400\",\n     \"message\": \"Bad request\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Not Authenticated:",
          "content": "HTTP/1.1 401 Not Authenticated\n {\n   \"error\": \"No Access Right\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/{clientId}/drivers/{driverId}",
    "title": "Update Driver",
    "version": "1.0.0",
    "name": "Update_Driver",
    "group": "Client",
    "description": "<p>Client update driver - update existing driver</p>",
    "parameter": {
      "fields": {
        "path": [
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "clientId",
            "description": "<p>Client id</p>"
          },
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "driverId",
            "description": "<p>Driver id</p>"
          }
        ],
        "body": [
          {
            "group": "body",
            "type": "String",
            "optional": true,
            "field": "firstName",
            "description": "<p>Driver firstname</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": true,
            "field": "lastName",
            "description": "<p>Driver lastname</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": true,
            "field": "email",
            "description": "<p>Driver email</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": true,
            "field": "phone",
            "description": "<p>Driver phone</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": true,
            "field": "address",
            "description": "<p>Driver address</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "HttpStatus",
            "description": "<p>200 if everything is ok</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Driver",
            "description": "<p>Updated driver { &quot;_id&quot;: &quot;a-d.x-;flow1-s9-3la-aswsq&quot;, &quot;firstName&quot;: &quot;Driver&quot;, &quot;lastName&quot;: &quot;Four&quot;, &quot;email&quot; : &quot;driverfour@gmail.com&quot;, &quot;phone&quot;: &quot;0600234567&quot;, &quot;address&quot;: &quot;St. Joseph's Boulevard 50&quot; }</p>"
          }
        ]
      }
    },
    "filename": "services/module_client/router.js",
    "groupTitle": "Client",
    "error": {
      "examples": [
        {
          "title": "Internal server error:",
          "content": "HTTP/1.1 500 Internal server error\n {\n   \"error\": {\n     \"code\": \"500\",\n     \"message\": \"Internal server error\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Not Found\"\n}",
          "type": "json"
        },
        {
          "title": "Bad request:",
          "content": "HTTP/1.1 400 Bad request\n {\n   \"error\": {\n     \"code\": \"400\",\n     \"message\": \"Bad request\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Not Authenticated:",
          "content": "HTTP/1.1 401 Not Authenticated\n {\n   \"error\": \"No Access Right\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/{clientId}/managers/{managerId}",
    "title": "Update Manager",
    "version": "1.0.0",
    "name": "Update_Manager",
    "group": "Client",
    "description": "<p>Client update manager - update existing manager</p>",
    "parameter": {
      "fields": {
        "path": [
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "clientId",
            "description": "<p>Client id</p>"
          },
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "managerId",
            "description": "<p>Manager id</p>"
          }
        ],
        "body": [
          {
            "group": "body",
            "type": "String",
            "optional": true,
            "field": "email",
            "description": "<p>Manager email</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": true,
            "field": "password",
            "description": "<p>Manager password</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": true,
            "field": "firstName",
            "description": "<p>Manager firstname</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": true,
            "field": "lastName",
            "description": "<p>Manager lastname</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": true,
            "field": "phone",
            "description": "<p>Manager phone</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "HttpStatus",
            "description": "<p>200 if everything is ok</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Manager",
            "description": "<p>Updated manager { &quot;_id&quot;: &quot;a-d.x-;s-39;x-s9-3la-fl2&quot;, &quot;firstName&quot;: &quot;John&quot;, &quot;lastName&quot;: &quot;Doe&quot;, &quot;phone&quot;: &quot;060/123456&quot;, &quot;email&quot;: &quot;johndoe@gmail.com&quot;, &quot;password&quot;: &quot;a3-xjd=-s,;kfga=dg&quot; }</p>"
          }
        ]
      }
    },
    "filename": "services/module_client/router.js",
    "groupTitle": "Client",
    "error": {
      "examples": [
        {
          "title": "Internal server error:",
          "content": "HTTP/1.1 500 Internal server error\n {\n   \"error\": {\n     \"code\": \"500\",\n     \"message\": \"Internal server error\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Not Found\"\n}",
          "type": "json"
        },
        {
          "title": "Bad request:",
          "content": "HTTP/1.1 400 Bad request\n {\n   \"error\": {\n     \"code\": \"400\",\n     \"message\": \"Bad request\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Not Authenticated:",
          "content": "HTTP/1.1 401 Not Authenticated\n {\n   \"error\": \"No Access Right\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/{clientId}/vehicles/{vehicleId}",
    "title": "Update Vehicle",
    "version": "1.0.0",
    "name": "Update_Vehicle",
    "group": "Client",
    "description": "<p>Client update vehicle - update existing vehicle</p>",
    "parameter": {
      "fields": {
        "path": [
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "clientId",
            "description": "<p>Client id</p>"
          },
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "vehicleId",
            "description": "<p>Vehicle id</p>"
          }
        ],
        "body": [
          {
            "group": "body",
            "type": "String",
            "optional": true,
            "field": "numberOfSeats",
            "description": "<p>Vehicle number of seats</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": "<p>Vehicle name</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": true,
            "field": "model",
            "description": "<p>Vehicle model</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": true,
            "field": "productionYear",
            "description": "<p>Vehicle production year</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": true,
            "field": "numberOfKmPassed",
            "description": "<p>Vehicle numberOfKmPassed</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "HttpStatus",
            "description": "<p>200 if everything is ok</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Vehicle",
            "description": "<p>Updated vehicle { &quot;_id&quot;: &quot;a-d.x-;s-39;x-s9-3la-fl2&quot;, &quot;name&quot;: &quot;First bus&quot;, &quot;model&quot;: &quot;Mercedes-Benz do Brasil&quot;, &quot;numberOfSeats&quot;: &quot;50&quot;, &quot;productionYear&quot;: &quot;2015&quot;, &quot;numberOfKmPassed&quot;: &quot;50000&quot; }</p>"
          }
        ]
      }
    },
    "filename": "services/module_client/router.js",
    "groupTitle": "Client",
    "error": {
      "examples": [
        {
          "title": "Internal server error:",
          "content": "HTTP/1.1 500 Internal server error\n {\n   \"error\": {\n     \"code\": \"500\",\n     \"message\": \"Internal server error\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Not Found\"\n}",
          "type": "json"
        },
        {
          "title": "Not Authenticated:",
          "content": "HTTP/1.1 401 Not Authenticated\n {\n   \"error\": \"No Access Right\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/{managerId}/destinations",
    "title": "Add Destination",
    "version": "1.0.0",
    "name": "Add_Destination",
    "group": "Manager",
    "description": "<p>Manager add destination - add destination</p>",
    "parameter": {
      "fields": {
        "path": [
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "managerId",
            "description": "<p>Manager id</p>"
          }
        ],
        "body": [
          {
            "group": "body",
            "type": "Object",
            "optional": false,
            "field": "startLocation",
            "description": "<p>Destination start location</p>"
          },
          {
            "group": "body",
            "type": "Object",
            "optional": false,
            "field": "endLocation",
            "description": "<p>Destination end location</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "HttpStatus",
            "description": "<p>200 if everything is ok</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Destination",
            "description": "<p>Created destination { &quot;startLocation&quot; : { &quot;lat&quot;: &quot;45.30&quot;, &quot;lng&quot;: &quot;45.30&quot; }, &quot;endLocation&quot;: { &quot;lat&quot;: &quot;45.31&quot;, &quot;lng&quot;: &quot;45.31&quot; }, }</p>"
          }
        ]
      }
    },
    "filename": "services/module_manager/router.js",
    "groupTitle": "Manager",
    "error": {
      "examples": [
        {
          "title": "Internal server error:",
          "content": "HTTP/1.1 500 Internal server error\n {\n   \"error\": {\n     \"code\": \"500\",\n     \"message\": \"Internal server error\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Bad request:",
          "content": "HTTP/1.1 400 Bad request\n {\n   \"error\": {\n     \"code\": \"400\",\n     \"message\": \"Bad request\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Not Found\"\n}",
          "type": "json"
        },
        {
          "title": "Not Authenticated:",
          "content": "HTTP/1.1 401 Not Authenticated\n {\n   \"error\": \"No Access Right\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/{managerId}/vehicles/{vehicleId}/expenses",
    "title": "Add Expense For Vehicle",
    "version": "1.0.0",
    "name": "Add_Expense_For_Vehicle",
    "group": "Manager",
    "description": "<p>Manager add expense for vehicle - add expense for specific vehicle</p>",
    "parameter": {
      "fields": {
        "path": [
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "managerId",
            "description": "<p>Manager id</p>"
          },
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "vehicleId",
            "description": "<p>Vehicle id</p>"
          }
        ],
        "body": [
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Expense name</p>"
          },
          {
            "group": "body",
            "type": "Number",
            "optional": false,
            "field": "amount",
            "description": "<p>Expense amount</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "HttpStatus",
            "description": "<p>200 if everything is ok</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Expense",
            "description": "<p>Created expense { &quot;_id&quot;: &quot;a-d.x-;s-39;x-s9-3la-fl2&quot;, &quot;name&quot;: &quot;firstExpense&quot;, &quot;amount&quot;: &quot;1000.00&quot;, &quot;vehicleId&quot; : &quot;awadx-;s-39;x-s9-3la-fff&quot;, &quot;date&quot;: &quot;2018-03-01&quot; }</p>"
          }
        ]
      }
    },
    "filename": "services/module_manager/router.js",
    "groupTitle": "Manager",
    "error": {
      "examples": [
        {
          "title": "Internal server error:",
          "content": "HTTP/1.1 500 Internal server error\n {\n   \"error\": {\n     \"code\": \"500\",\n     \"message\": \"Internal server error\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Bad request:",
          "content": "HTTP/1.1 400 Bad request\n {\n   \"error\": {\n     \"code\": \"400\",\n     \"message\": \"Bad request\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Not Authenticated:",
          "content": "HTTP/1.1 401 Not Authenticated\n {\n   \"error\": \"No Access Right\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/{managerId}/destinations/{destinationId}",
    "title": "Delete Destination",
    "version": "1.0.0",
    "name": "Delete_Destination",
    "group": "Manager",
    "description": "<p>Manager delete destination - delete destination</p>",
    "parameter": {
      "fields": {
        "path": [
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "managerId",
            "description": "<p>Manager id</p>"
          },
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "destinationId",
            "description": "<p>Destination id</p>"
          }
        ],
        "body": [
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "destinationManagerId",
            "description": "<p>Manager id for destination</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "HttpStatus",
            "description": "<p>200 if everything is ok</p>"
          }
        ]
      }
    },
    "filename": "services/module_manager/router.js",
    "groupTitle": "Manager",
    "error": {
      "examples": [
        {
          "title": "Internal server error:",
          "content": "HTTP/1.1 500 Internal server error\n {\n   \"error\": {\n     \"code\": \"500\",\n     \"message\": \"Internal server error\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Not Found\"\n}",
          "type": "json"
        },
        {
          "title": "Bad request:",
          "content": "HTTP/1.1 400 Bad request\n {\n   \"error\": {\n     \"code\": \"400\",\n     \"message\": \"Bad request\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Not allowed:",
          "content": "HTTP/1.1 405 Not allowed\n {\n   \"error\": {\n   \"code\": \"405\",\n     \"message\": \"Not allowed\"\n }\n }",
          "type": "json"
        },
        {
          "title": "Not Authenticated:",
          "content": "HTTP/1.1 401 Not Authenticated\n {\n   \"error\": \"No Access Right\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/{managerId}/vehicles/{vehicleId}/expenses/{vehicleExpenseId}",
    "title": "Delete Expense For Vehicle",
    "version": "1.0.0",
    "name": "Delete_Expense_For_Vehicle",
    "group": "Manager",
    "description": "<p>Manager delete expense for vehicle - delete expense for specific vehicle</p>",
    "parameter": {
      "fields": {
        "path": [
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "managerId",
            "description": "<p>Manager id</p>"
          },
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "vehicleId",
            "description": "<p>Vehicle id</p>"
          },
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "vehicleExpenseId",
            "description": "<p>Expense id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "HttpStatus",
            "description": "<p>200 if everything is ok</p>"
          }
        ]
      }
    },
    "filename": "services/module_manager/router.js",
    "groupTitle": "Manager",
    "error": {
      "examples": [
        {
          "title": "Internal server error:",
          "content": "HTTP/1.1 500 Internal server error\n {\n   \"error\": {\n     \"code\": \"500\",\n     \"message\": \"Internal server error\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Not Found\"\n}",
          "type": "json"
        },
        {
          "title": "Not Authenticated:",
          "content": "HTTP/1.1 401 Not Authenticated\n {\n   \"error\": \"No Access Right\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/{managerId}/users/{userId}",
    "title": "Delete User",
    "version": "1.0.0",
    "name": "Delete_User",
    "group": "Manager",
    "description": "<p>Manager delete user - delete user</p>",
    "parameter": {
      "fields": {
        "path": [
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "managerId",
            "description": "<p>Manager id</p>"
          },
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>User id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "HttpStatus",
            "description": "<p>200 if everything is ok</p>"
          }
        ]
      }
    },
    "filename": "services/module_manager/router.js",
    "groupTitle": "Manager",
    "error": {
      "examples": [
        {
          "title": "Internal server error:",
          "content": "HTTP/1.1 500 Internal server error\n {\n   \"error\": {\n     \"code\": \"500\",\n     \"message\": \"Internal server error\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Not Found\"\n}",
          "type": "json"
        },
        {
          "title": "Not Authenticated:",
          "content": "HTTP/1.1 401 Not Authenticated\n {\n   \"error\": \"No Access Right\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/{managerId}/vehicles/{vehicleId}/extendRegistration",
    "title": "Extend Registration For Vehicle",
    "version": "1.0.0",
    "name": "Extend_Registration_For_Vehicle",
    "group": "Manager",
    "description": "<p>Manager extend registration for vehicle - extend registration for specific vehicle</p>",
    "parameter": {
      "fields": {
        "path": [
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "managerId",
            "description": "<p>Manager id</p>"
          },
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "vehicleId",
            "description": "<p>Vehicle id</p>"
          }
        ],
        "body": [
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "licensePlate",
            "description": "<p>Vehicle new license plate</p>"
          },
          {
            "group": "body",
            "type": "Date",
            "optional": false,
            "field": "licenseExpireDate",
            "description": "<p>Vehicle new license expire date</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "HttpStatus",
            "description": "<p>200 if everything is ok</p>"
          }
        ]
      }
    },
    "filename": "services/module_manager/router.js",
    "groupTitle": "Manager",
    "error": {
      "examples": [
        {
          "title": "Internal server error:",
          "content": "HTTP/1.1 500 Internal server error\n {\n   \"error\": {\n     \"code\": \"500\",\n     \"message\": \"Internal server error\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Not Found\"\n}",
          "type": "json"
        },
        {
          "title": "Bad request:",
          "content": "HTTP/1.1 400 Bad request\n {\n   \"error\": {\n     \"code\": \"400\",\n     \"message\": \"Bad request\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Not Authenticated:",
          "content": "HTTP/1.1 401 Not Authenticated\n {\n   \"error\": \"No Access Right\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/{managerId}/destinationRequests/submitted",
    "title": "Find All Submitted Requests",
    "version": "1.0.0",
    "name": "Find_All_Submitted_Requests",
    "group": "Manager",
    "description": "<p>Manager find all submitted requests - find all submitted requests</p>",
    "parameter": {
      "fields": {
        "path": [
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "managerId",
            "description": "<p>Manager id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "HttpStatus",
            "description": "<p>200 if everything is ok</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "Requests",
            "description": "<p>Submitted requests [ { &quot;_id&quot;: &quot;a-d.x-;s-39;x-s9-3la-fl2&quot;, &quot;firstName&quot;: &quot;John&quot;, &quot;lastName&quot;: &quot;Doe&quot;, &quot;phone&quot;: &quot;060/123456&quot;, &quot;email&quot;: &quot;johndoe@gmail.com&quot;, &quot;password&quot;: &quot;a3-xjd=-s,;kfga=dg&quot; }, { &quot;_id&quot;: &quot;aasdfse-39;x-s9-3la-fl2&quot;, &quot;firstName&quot;: &quot;Johna&quot;, &quot;lastName&quot;: &quot;Doe&quot;, &quot;phone&quot;: &quot;060/234567&quot;, &quot;email&quot;: &quot;johnadoe@gmail.com&quot;, &quot;password&quot;: &quot;a3-asdfxjd=-s,;kfga=dg&quot; } ]</p>"
          }
        ]
      }
    },
    "filename": "services/module_manager/router.js",
    "groupTitle": "Manager",
    "error": {
      "examples": [
        {
          "title": "Internal server error:",
          "content": "HTTP/1.1 500 Internal server error\n {\n   \"error\": {\n     \"code\": \"500\",\n     \"message\": \"Internal server error\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Not Found\"\n}",
          "type": "json"
        },
        {
          "title": "Not Authenticated:",
          "content": "HTTP/1.1 401 Not Authenticated\n {\n   \"error\": \"No Access Right\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/{managerId}/destinations/{destinationId}",
    "title": "Find Destination By Id",
    "version": "1.0.0",
    "name": "Find_Destination_By_Id",
    "group": "Manager",
    "description": "<p>Manager find destination by id - find destination by specific id</p>",
    "parameter": {
      "fields": {
        "path": [
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "managerId",
            "description": "<p>Manager id</p>"
          },
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "destinationId",
            "description": "<p>Destination id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "HttpStatus",
            "description": "<p>200 if everything is ok</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "Expenses",
            "description": "<p>All expenses for vehicle { &quot;_id&quot;: &quot;a-d.x-;s-39;x-s9-3la-fl2&quot;, &quot;name&quot;: &quot;firstExpense&quot;, &quot;amount&quot;: &quot;1000.00&quot;, &quot;vehicleId&quot; : &quot;awadx-;s-39;x-s9-3la-fff&quot;, &quot;date&quot;: &quot;2018-03-01&quot; }</p>"
          }
        ]
      }
    },
    "filename": "services/module_manager/router.js",
    "groupTitle": "Manager",
    "error": {
      "examples": [
        {
          "title": "Internal server error:",
          "content": "HTTP/1.1 500 Internal server error\n {\n   \"error\": {\n     \"code\": \"500\",\n     \"message\": \"Internal server error\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Not Found\"\n}",
          "type": "json"
        },
        {
          "title": "Not Authenticated:",
          "content": "HTTP/1.1 401 Not Authenticated\n {\n   \"error\": \"No Access Right\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/{managerId}/destinations/{destinationId}",
    "title": "Get All Destinations For Manager",
    "version": "1.0.0",
    "name": "Get_All_Destinations_For_Manager",
    "group": "Manager",
    "description": "<p>Manager get all destinations - get all destinations for manager with specific id</p>",
    "parameter": {
      "fields": {
        "path": [
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "managerId",
            "description": "<p>Manager id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "HttpStatus",
            "description": "<p>200 if everything is ok</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "Destinations",
            "description": "<p>All destinations for manager [ { &quot;_id&quot;: &quot;a-d.x-;s-39;x-s9-3la-fl2&quot;, &quot;name&quot;: &quot;firstExpense&quot;, &quot;amount&quot;: &quot;1000.00&quot;, &quot;vehicleId&quot; : &quot;awadx-;s-39;x-s9-3la-fff&quot;, &quot;date&quot;: &quot;2018-03-01&quot; }, { &quot;_id&quot;: &quot;aas-;s-39;x-s9-3la-fwirw&quot;, &quot;name&quot;: &quot;secondExpense&quot;, &quot;amount&quot;: &quot;1500.00&quot;, &quot;vehicleId&quot; : &quot;awadx-;s-39;x-s9-3la-fff&quot;, &quot;date&quot;: &quot;2018-03-01&quot; }, ]</p>"
          }
        ]
      }
    },
    "filename": "services/module_manager/router.js",
    "groupTitle": "Manager",
    "error": {
      "examples": [
        {
          "title": "Internal server error:",
          "content": "HTTP/1.1 500 Internal server error\n {\n   \"error\": {\n     \"code\": \"500\",\n     \"message\": \"Internal server error\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Not Found\"\n}",
          "type": "json"
        },
        {
          "title": "Not Authenticated:",
          "content": "HTTP/1.1 401 Not Authenticated\n {\n   \"error\": \"No Access Right\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/{managerId}/destinations/{destinationId}/other",
    "title": "Get All Destinations Not Handled By Manager",
    "version": "1.0.0",
    "name": "Get_All_Destinations_Not_Handled_By_Manager",
    "group": "Manager",
    "description": "<p>Manager get all destinations - get all destinations not handled by manager with specific id</p>",
    "parameter": {
      "fields": {
        "path": [
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "managerId",
            "description": "<p>Manager id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "HttpStatus",
            "description": "<p>200 if everything is ok</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "Destinations",
            "description": "<p>All destinations for manager [ { &quot;_id&quot;: &quot;a-d.x-;s-39;x-s9-3la-fl2&quot;, &quot;name&quot;: &quot;firstExpense&quot;, &quot;amount&quot;: &quot;1000.00&quot;, &quot;vehicleId&quot; : &quot;awadx-;s-39;x-s9-3la-fff&quot;, &quot;date&quot;: &quot;2018-03-01&quot; }, { &quot;_id&quot;: &quot;aas-;s-39;x-s9-3la-fwirw&quot;, &quot;name&quot;: &quot;secondExpense&quot;, &quot;amount&quot;: &quot;1500.00&quot;, &quot;vehicleId&quot; : &quot;awadx-;s-39;x-s9-3la-fff&quot;, &quot;date&quot;: &quot;2018-03-01&quot; }, ]</p>"
          }
        ]
      }
    },
    "filename": "services/module_manager/router.js",
    "groupTitle": "Manager",
    "error": {
      "examples": [
        {
          "title": "Internal server error:",
          "content": "HTTP/1.1 500 Internal server error\n {\n   \"error\": {\n     \"code\": \"500\",\n     \"message\": \"Internal server error\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Not Found\"\n}",
          "type": "json"
        },
        {
          "title": "Not Authenticated:",
          "content": "HTTP/1.1 401 Not Authenticated\n {\n   \"error\": \"No Access Right\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/{managerId}/vehicles/{vehicleId}/expenses",
    "title": "Get All Expenses For Vehicle",
    "version": "1.0.0",
    "name": "Get_All_Expenses_For_Vehicle",
    "group": "Manager",
    "description": "<p>Manager get all vehicle expenses - get all expenses for specific vehicle</p>",
    "parameter": {
      "fields": {
        "path": [
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "managerId",
            "description": "<p>Manager id</p>"
          },
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "vehicleId",
            "description": "<p>Vehicle id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "HttpStatus",
            "description": "<p>200 if everything is ok</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "Expenses",
            "description": "<p>All expenses for vehicle [ { &quot;_id&quot;: &quot;a-d.x-;s-39;x-s9-3la-fl2&quot;, &quot;name&quot;: &quot;firstExpense&quot;, &quot;amount&quot;: &quot;1000.00&quot;, &quot;vehicleId&quot; : &quot;awadx-;s-39;x-s9-3la-fff&quot;, &quot;date&quot;: &quot;2018-03-01&quot; }, { &quot;_id&quot;: &quot;aas-;s-39;x-s9-3la-fwirw&quot;, &quot;name&quot;: &quot;secondExpense&quot;, &quot;amount&quot;: &quot;1500.00&quot;, &quot;vehicleId&quot; : &quot;awadx-;s-39;x-s9-3la-fff&quot;, &quot;date&quot;: &quot;2018-03-01&quot; }, ]</p>"
          }
        ]
      }
    },
    "filename": "services/module_manager/router.js",
    "groupTitle": "Manager",
    "error": {
      "examples": [
        {
          "title": "Internal server error:",
          "content": "HTTP/1.1 500 Internal server error\n {\n   \"error\": {\n     \"code\": \"500\",\n     \"message\": \"Internal server error\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Not Found\"\n}",
          "type": "json"
        },
        {
          "title": "Not Authenticated:",
          "content": "HTTP/1.1 401 Not Authenticated\n {\n   \"error\": \"No Access Right\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/{managerId}/destinationRequests/{destinationId}",
    "title": "Get All Requests For Destination",
    "version": "1.0.0",
    "name": "Get_All_Requests_For_Destination",
    "group": "Manager",
    "description": "<p>Manager get all requests for destination - get all requests for destination</p>",
    "parameter": {
      "fields": {
        "path": [
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "managerId",
            "description": "<p>Manager id</p>"
          },
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "destinationId",
            "description": "<p>Destination id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "HttpStatus",
            "description": "<p>200 if everything is ok</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "Requests",
            "description": "<p>Requests for destination [ { &quot;_id&quot;: &quot;a-d.x-;s-39;x-s9-3la-fl2&quot;, &quot;firstName&quot;: &quot;John&quot;, &quot;lastName&quot;: &quot;Doe&quot;, &quot;phone&quot;: &quot;060/123456&quot;, &quot;email&quot;: &quot;johndoe@gmail.com&quot;, &quot;password&quot;: &quot;a3-xjd=-s,;kfga=dg&quot; }, { &quot;_id&quot;: &quot;aasdfse-39;x-s9-3la-fl2&quot;, &quot;firstName&quot;: &quot;Johna&quot;, &quot;lastName&quot;: &quot;Doe&quot;, &quot;phone&quot;: &quot;060/234567&quot;, &quot;email&quot;: &quot;johnadoe@gmail.com&quot;, &quot;password&quot;: &quot;a3-asdfxjd=-s,;kfga=dg&quot; } ]</p>"
          }
        ]
      }
    },
    "filename": "services/module_manager/router.js",
    "groupTitle": "Manager",
    "error": {
      "examples": [
        {
          "title": "Internal server error:",
          "content": "HTTP/1.1 500 Internal server error\n {\n   \"error\": {\n     \"code\": \"500\",\n     \"message\": \"Internal server error\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Not Found\"\n}",
          "type": "json"
        },
        {
          "title": "Not Authenticated:",
          "content": "HTTP/1.1 401 Not Authenticated\n {\n   \"error\": \"No Access Right\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/{managerId}/users",
    "title": "Get All Users",
    "version": "1.0.0",
    "name": "Get_All_Users",
    "group": "Manager",
    "description": "<p>Manager get all users - get all users</p>",
    "parameter": {
      "fields": {
        "path": [
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "managerId",
            "description": "<p>Manager id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "HttpStatus",
            "description": "<p>200 if everything is ok</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "Users",
            "description": "<p>All users [ { &quot;_id&quot;: &quot;a-d.x-;s-39;x-s9-3la-fl2&quot;, &quot;firstName&quot;: &quot;John&quot;, &quot;lastName&quot;: &quot;Doe&quot;, &quot;phone&quot;: &quot;060/123456&quot;, &quot;email&quot;: &quot;johndoe@gmail.com&quot;, &quot;password&quot;: &quot;a3-xjd=-s,;kfga=dg&quot; }, { &quot;_id&quot;: &quot;aasdfse-39;x-s9-3la-fl2&quot;, &quot;firstName&quot;: &quot;Johna&quot;, &quot;lastName&quot;: &quot;Doe&quot;, &quot;phone&quot;: &quot;060/234567&quot;, &quot;email&quot;: &quot;johnadoe@gmail.com&quot;, &quot;password&quot;: &quot;a3-asdfxjd=-s,;kfga=dg&quot; } ]</p>"
          }
        ]
      }
    },
    "filename": "services/module_manager/router.js",
    "groupTitle": "Manager",
    "error": {
      "examples": [
        {
          "title": "Internal server error:",
          "content": "HTTP/1.1 500 Internal server error\n {\n   \"error\": {\n     \"code\": \"500\",\n     \"message\": \"Internal server error\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Not Found\"\n}",
          "type": "json"
        },
        {
          "title": "Not Authenticated:",
          "content": "HTTP/1.1 401 Not Authenticated\n {\n   \"error\": \"No Access Right\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/{managerId}/vehicles",
    "title": "Get All Vehicles",
    "version": "1.0.0",
    "name": "Get_All_vehicles",
    "group": "Manager",
    "description": "<p>Manager get all vehicles - get all vehicles</p>",
    "parameter": {
      "fields": {
        "path": [
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "managerId",
            "description": "<p>Manager id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "HttpStatus",
            "description": "<p>200 if everything is ok</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "Vehicles",
            "description": "<p>All vehicles [ { &quot;_id&quot;: &quot;a-d.x-;s-39;x-s9-3la-fl2&quot;, &quot;name&quot;: &quot;First bus&quot;, &quot;model&quot;: &quot;Mercedes-Benz do Brasil&quot;, &quot;licensePlate&quot; : &quot;NS-123-AD&quot;, &quot;licenseExpireDate&quot;: &quot;2019-10-21&quot;, &quot;numberOfSeats&quot;: &quot;50&quot;, &quot;productionYear&quot;: &quot;2015&quot;, &quot;numberOfKmPassed&quot;: &quot;50000&quot; }, { &quot;_id&quot;: &quot;add.x-;s-39;x-s9-3la-awe&quot;, &quot;name&quot;: &quot;Second bus&quot;, &quot;model&quot;: &quot;Mercedes-Benz do Brasil&quot;, &quot;licensePlate&quot; : &quot;NS-456-BC&quot;, &quot;licenseExpireDate&quot;: &quot;2019-10-21&quot;, &quot;numberOfSeats&quot;: &quot;50&quot;, &quot;productionYear&quot;: &quot;2015&quot;, &quot;numberOfKmPassed&quot;: &quot;55000&quot; } ]</p>"
          }
        ]
      }
    },
    "filename": "services/module_manager/router.js",
    "groupTitle": "Manager",
    "error": {
      "examples": [
        {
          "title": "Internal server error:",
          "content": "HTTP/1.1 500 Internal server error\n {\n   \"error\": {\n     \"code\": \"500\",\n     \"message\": \"Internal server error\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Not Found\"\n}",
          "type": "json"
        },
        {
          "title": "Not Authenticated:",
          "content": "HTTP/1.1 401 Not Authenticated\n {\n   \"error\": \"No Access Right\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/{managerId}/vehicles/{vehicleId}/expenses/{vehicleExpenseId}",
    "title": "Get Expense By Id",
    "version": "1.0.0",
    "name": "Get_Expense_By_Id",
    "group": "Manager",
    "description": "<p>Manager get expense by id - get expense by specific id</p>",
    "parameter": {
      "fields": {
        "path": [
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "managerId",
            "description": "<p>Manager id</p>"
          },
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "vehicleId",
            "description": "<p>Vehicle id</p>"
          },
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "vehicleExpenseId",
            "description": "<p>Expense id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "HttpStatus",
            "description": "<p>200 if everything is ok</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Expense",
            "description": "<p>Object expense { &quot;_id&quot;: &quot;a-d.x-;s-39;x-s9-3la-fl2&quot;, &quot;name&quot;: &quot;firstExpense&quot;, &quot;amount&quot;: &quot;1000.00&quot;, &quot;vehicleId&quot; : &quot;awadx-;s-39;x-s9-3la-fff&quot;, &quot;date&quot;: &quot;2018-03-01&quot; }</p>"
          }
        ]
      }
    },
    "filename": "services/module_manager/router.js",
    "groupTitle": "Manager",
    "error": {
      "examples": [
        {
          "title": "Internal server error:",
          "content": "HTTP/1.1 500 Internal server error\n {\n   \"error\": {\n     \"code\": \"500\",\n     \"message\": \"Internal server error\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Not Found\"\n}",
          "type": "json"
        },
        {
          "title": "Not Authenticated:",
          "content": "HTTP/1.1 401 Not Authenticated\n {\n   \"error\": \"No Access Right\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/login",
    "title": "Manager Login",
    "version": "1.0.0",
    "name": "Manager_Login",
    "group": "Manager",
    "description": "<p>Manager login - login to account</p>",
    "parameter": {
      "fields": {
        "body": [
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Manager email</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Manager password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "HttpStatus",
            "description": "<p>200 if everything is ok</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Manager token - expiration time one day { &quot;token&quot;: &quot;23042016MSSSU2-032AE0AA&quot; }</p>"
          }
        ]
      }
    },
    "filename": "services/module_manager/router.js",
    "groupTitle": "Manager",
    "error": {
      "examples": [
        {
          "title": "Internal server error:",
          "content": "HTTP/1.1 500 Internal server error\n {\n   \"error\": {\n     \"code\": \"500\",\n     \"message\": \"Internal server error\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Bad request:",
          "content": "HTTP/1.1 400 Bad request\n {\n   \"error\": {\n     \"code\": \"400\",\n     \"message\": \"Bad request\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Invalid username/password:",
          "content": "HTTP/1.1 409 Invalid username/password\n {\n   \"error\": {\n     \"code\": \"409\",\n     \"message\": \"Invalid username/password\"\n   }\n }",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/{managerId}/destinations/{destinationId}/setDrivers",
    "title": "Set Destination Drivers",
    "version": "1.0.0",
    "name": "Set_Destination_Drivers",
    "group": "Manager",
    "description": "<p>Manager set destination drivers - set destination drivers</p>",
    "parameter": {
      "fields": {
        "path": [
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "managerId",
            "description": "<p>Manager id</p>"
          },
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "destinationId",
            "description": "<p>Destination id</p>"
          }
        ],
        "body": [
          {
            "group": "body",
            "type": "Array",
            "optional": false,
            "field": "drivers",
            "description": "<p>Drivers for destination</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "destinationManagerId",
            "description": "<p>Manager id for destination</p>"
          },
          {
            "group": "body",
            "type": "Date",
            "optional": false,
            "field": "startDate",
            "description": "<p>Destination startDate</p>"
          },
          {
            "group": "body",
            "type": "Date",
            "optional": false,
            "field": "endDate",
            "description": "<p>Destination endDate</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "HttpStatus",
            "description": "<p>200 if everything is ok</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Destination",
            "description": "<p>Updated destination { &quot;_id&quot;: &quot;a-d.x-;s-39;x-s9-3la-fl2&quot;, &quot;name&quot;: &quot;firstExpense&quot;, &quot;amount&quot;: &quot;1000.00&quot;, &quot;vehicleId&quot; : &quot;awadx-;s-39;x-s9-3la-fff&quot;, &quot;date&quot;: &quot;2018-03-01&quot; }</p>"
          }
        ]
      }
    },
    "filename": "services/module_manager/router.js",
    "groupTitle": "Manager",
    "error": {
      "examples": [
        {
          "title": "Internal server error:",
          "content": "HTTP/1.1 500 Internal server error\n {\n   \"error\": {\n     \"code\": \"500\",\n     \"message\": \"Internal server error\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Not Found\"\n}",
          "type": "json"
        },
        {
          "title": "Bad request:",
          "content": "HTTP/1.1 400 Bad request\n {\n   \"error\": {\n     \"code\": \"400\",\n     \"message\": \"Bad request\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Not allowed:",
          "content": "HTTP/1.1 405 Not allowed\n {\n   \"error\": {\n   \"code\": \"405\",\n     \"message\": \"Not allowed\"\n }\n }",
          "type": "json"
        },
        {
          "title": "Not Authenticated:",
          "content": "HTTP/1.1 401 Not Authenticated\n {\n   \"error\": \"No Access Right\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/{managerId}/destinationRequests/{destinationRequestId}/setAccepted",
    "title": "Set Destination Request To Accepted",
    "version": "1.0.0",
    "name": "Set_Destination_Request_To_Accepted",
    "group": "Manager",
    "description": "<p>Manager set request to accepted - set request to accepted</p>",
    "parameter": {
      "fields": {
        "path": [
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "managerId",
            "description": "<p>Manager id</p>"
          },
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "destinationRequestId",
            "description": "<p>Destination request id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "HttpStatus",
            "description": "<p>200 if everything is ok</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Request",
            "description": "<p>DestinationRequest [ { &quot;_id&quot;: &quot;a-d.x-;s-39;x-s9-3la-fl2&quot;, &quot;firstName&quot;: &quot;John&quot;, &quot;lastName&quot;: &quot;Doe&quot;, &quot;phone&quot;: &quot;060/123456&quot;, &quot;email&quot;: &quot;johndoe@gmail.com&quot;, &quot;password&quot;: &quot;a3-xjd=-s,;kfga=dg&quot; } ]</p>"
          }
        ]
      }
    },
    "filename": "services/module_manager/router.js",
    "groupTitle": "Manager",
    "error": {
      "examples": [
        {
          "title": "Internal server error:",
          "content": "HTTP/1.1 500 Internal server error\n {\n   \"error\": {\n     \"code\": \"500\",\n     \"message\": \"Internal server error\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Not Found\"\n}",
          "type": "json"
        },
        {
          "title": "Not allowed:",
          "content": "HTTP/1.1 405 Not allowed\n {\n   \"error\": {\n   \"code\": \"405\",\n     \"message\": \"Not allowed\"\n }\n }",
          "type": "json"
        },
        {
          "title": "Not Authenticated:",
          "content": "HTTP/1.1 401 Not Authenticated\n {\n   \"error\": \"No Access Right\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/{managerId}/destinationRequests/{destinationRequestId}/setAwaiting",
    "title": "Set Destination Request To Awating Confirmation",
    "version": "1.0.0",
    "name": "Set_Destination_Request_To_Awating_Confirmation",
    "group": "Manager",
    "description": "<p>Manager set request to awaiting confirmation - set request to awaiting confirmation</p>",
    "parameter": {
      "fields": {
        "path": [
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "managerId",
            "description": "<p>Manager id</p>"
          },
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "destinationRequestId",
            "description": "<p>Destination request id</p>"
          }
        ],
        "body": [
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "startDate",
            "description": "<p>Request start date</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "endDate",
            "description": "<p>Request end date</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "destinationId",
            "description": "<p>Destination id</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "destinationOrder",
            "description": "<p>Order of request in destination route</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "HttpStatus",
            "description": "<p>200 if everything is ok</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Request",
            "description": "<p>DestinationRequest [ { &quot;_id&quot;: &quot;a-d.x-;s-39;x-s9-3la-fl2&quot;, &quot;firstName&quot;: &quot;John&quot;, &quot;lastName&quot;: &quot;Doe&quot;, &quot;phone&quot;: &quot;060/123456&quot;, &quot;email&quot;: &quot;johndoe@gmail.com&quot;, &quot;password&quot;: &quot;a3-xjd=-s,;kfga=dg&quot; } ]</p>"
          }
        ]
      }
    },
    "filename": "services/module_manager/router.js",
    "groupTitle": "Manager",
    "error": {
      "examples": [
        {
          "title": "Internal server error:",
          "content": "HTTP/1.1 500 Internal server error\n {\n   \"error\": {\n     \"code\": \"500\",\n     \"message\": \"Internal server error\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Not Found\"\n}",
          "type": "json"
        },
        {
          "title": "Bad request:",
          "content": "HTTP/1.1 400 Bad request\n {\n   \"error\": {\n     \"code\": \"400\",\n     \"message\": \"Bad request\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Not allowed:",
          "content": "HTTP/1.1 405 Not allowed\n {\n   \"error\": {\n   \"code\": \"405\",\n     \"message\": \"Not allowed\"\n }\n }",
          "type": "json"
        },
        {
          "title": "Not Authenticated:",
          "content": "HTTP/1.1 401 Not Authenticated\n {\n   \"error\": \"No Access Right\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/{managerId}/destinationRequests/{destinationRequestId}/setRejected",
    "title": "Set Destination Request To Rejected",
    "version": "1.0.0",
    "name": "Set_Destination_Request_To_Rejected",
    "group": "Manager",
    "description": "<p>Manager set request to rejected - set request to rejected</p>",
    "parameter": {
      "fields": {
        "path": [
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "managerId",
            "description": "<p>Manager id</p>"
          },
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "destinationRequestId",
            "description": "<p>Destination request id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "HttpStatus",
            "description": "<p>200 if everything is ok</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Request",
            "description": "<p>DestinationRequest [ { &quot;_id&quot;: &quot;a-d.x-;s-39;x-s9-3la-fl2&quot;, &quot;firstName&quot;: &quot;John&quot;, &quot;lastName&quot;: &quot;Doe&quot;, &quot;phone&quot;: &quot;060/123456&quot;, &quot;email&quot;: &quot;johndoe@gmail.com&quot;, &quot;password&quot;: &quot;a3-xjd=-s,;kfga=dg&quot; } ]</p>"
          }
        ]
      }
    },
    "filename": "services/module_manager/router.js",
    "groupTitle": "Manager",
    "error": {
      "examples": [
        {
          "title": "Internal server error:",
          "content": "HTTP/1.1 500 Internal server error\n {\n   \"error\": {\n     \"code\": \"500\",\n     \"message\": \"Internal server error\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Not Found\"\n}",
          "type": "json"
        },
        {
          "title": "Not Authenticated:",
          "content": "HTTP/1.1 401 Not Authenticated\n {\n   \"error\": \"No Access Right\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/{managerId}/destinations/{destinationId}/setVehicle",
    "title": "Set Destination Vehicle",
    "version": "1.0.0",
    "name": "Set_Destination_Vehicle",
    "group": "Manager",
    "description": "<p>Manager set destination vehicle - set destination vehicle</p>",
    "parameter": {
      "fields": {
        "path": [
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "managerId",
            "description": "<p>Manager id</p>"
          },
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "destinationId",
            "description": "<p>Destination id</p>"
          }
        ],
        "body": [
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "vehicleId",
            "description": "<p>Vehicle id for vehicle setting</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "destinationManagerId",
            "description": "<p>Manager id for destination</p>"
          },
          {
            "group": "body",
            "type": "Date",
            "optional": false,
            "field": "startDate",
            "description": "<p>Destination startDate</p>"
          },
          {
            "group": "body",
            "type": "Date",
            "optional": false,
            "field": "endDate",
            "description": "<p>Destination endDate</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "HttpStatus",
            "description": "<p>200 if everything is ok</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Destination",
            "description": "<p>Updated destination { &quot;_id&quot;: &quot;a-d.x-;s-39;x-s9-3la-fl2&quot;, &quot;name&quot;: &quot;firstExpense&quot;, &quot;amount&quot;: &quot;1000.00&quot;, &quot;vehicleId&quot; : &quot;awadx-;s-39;x-s9-3la-fff&quot;, &quot;date&quot;: &quot;2018-03-01&quot; }</p>"
          }
        ]
      }
    },
    "filename": "services/module_manager/router.js",
    "groupTitle": "Manager",
    "error": {
      "examples": [
        {
          "title": "Internal server error:",
          "content": "HTTP/1.1 500 Internal server error\n {\n   \"error\": {\n     \"code\": \"500\",\n     \"message\": \"Internal server error\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Not Found\"\n}",
          "type": "json"
        },
        {
          "title": "Bad request:",
          "content": "HTTP/1.1 400 Bad request\n {\n   \"error\": {\n     \"code\": \"400\",\n     \"message\": \"Bad request\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Not allowed:",
          "content": "HTTP/1.1 405 Not allowed\n {\n   \"error\": {\n   \"code\": \"405\",\n     \"message\": \"Not allowed\"\n }\n }",
          "type": "json"
        },
        {
          "title": "Not Authenticated:",
          "content": "HTTP/1.1 401 Not Authenticated\n {\n   \"error\": \"No Access Right\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/{managerId}/destinations/{destinationId}",
    "title": "Update Destination",
    "version": "1.0.0",
    "name": "Update_Destination",
    "group": "Manager",
    "description": "<p>Manager update destination - update destination</p>",
    "parameter": {
      "fields": {
        "path": [
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "managerId",
            "description": "<p>Manager id</p>"
          },
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "destinationId",
            "description": "<p>Destination id</p>"
          }
        ],
        "body": [
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "destinationManagerId",
            "description": "<p>Manager id for destination</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": true,
            "field": "startLocation",
            "description": "<p>Expense name</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": true,
            "field": "endLocation",
            "description": "<p>Expense amount</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": true,
            "field": "startDate",
            "description": "<p>Expense name</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": true,
            "field": "endDate",
            "description": "<p>Expense amount</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": true,
            "field": "driversPay",
            "description": "<p>Expense name</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": true,
            "field": "numberOfKms",
            "description": "<p>Expense amount</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": true,
            "field": "fuelExpenses",
            "description": "<p>Expense name</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "HttpStatus",
            "description": "<p>200 if everything is ok</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Destination",
            "description": "<p>Updated destination { &quot;_id&quot;: &quot;a-d.x-;s-39;x-s9-3la-fl2&quot;, &quot;name&quot;: &quot;firstExpense&quot;, &quot;amount&quot;: &quot;1000.00&quot;, &quot;vehicleId&quot; : &quot;awadx-;s-39;x-s9-3la-fff&quot;, &quot;date&quot;: &quot;2018-03-01&quot; }</p>"
          }
        ]
      }
    },
    "filename": "services/module_manager/router.js",
    "groupTitle": "Manager",
    "error": {
      "examples": [
        {
          "title": "Internal server error:",
          "content": "HTTP/1.1 500 Internal server error\n {\n   \"error\": {\n     \"code\": \"500\",\n     \"message\": \"Internal server error\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Not Found\"\n}",
          "type": "json"
        },
        {
          "title": "Bad request:",
          "content": "HTTP/1.1 400 Bad request\n {\n   \"error\": {\n     \"code\": \"400\",\n     \"message\": \"Bad request\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Not allowed:",
          "content": "HTTP/1.1 405 Not allowed\n {\n   \"error\": {\n   \"code\": \"405\",\n     \"message\": \"Not allowed\"\n }\n }",
          "type": "json"
        },
        {
          "title": "Not Authenticated:",
          "content": "HTTP/1.1 401 Not Authenticated\n {\n   \"error\": \"No Access Right\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/{managerId}/vehicles/{vehicleId}/expenses/{vehicleExpenseId}",
    "title": "Update Expense For Vehicle",
    "version": "1.0.0",
    "name": "Update_Expense_For_Vehicle",
    "group": "Manager",
    "description": "<p>Manager update expense for vehicle - update expense for specific vehicle</p>",
    "parameter": {
      "fields": {
        "path": [
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "managerId",
            "description": "<p>Manager id</p>"
          },
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "vehicleId",
            "description": "<p>Vehicle id</p>"
          },
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "vehicleExpenseId",
            "description": "<p>Expense id</p>"
          }
        ],
        "body": [
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Expense name</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "amount",
            "description": "<p>Expense amount</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "HttpStatus",
            "description": "<p>200 if everything is ok</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Expense",
            "description": "<p>Updated expense { &quot;_id&quot;: &quot;a-d.x-;s-39;x-s9-3la-fl2&quot;, &quot;name&quot;: &quot;firstExpense&quot;, &quot;amount&quot;: &quot;1000.00&quot;, &quot;vehicleId&quot; : &quot;awadx-;s-39;x-s9-3la-fff&quot;, &quot;date&quot;: &quot;2018-03-01&quot; }</p>"
          }
        ]
      }
    },
    "filename": "services/module_manager/router.js",
    "groupTitle": "Manager",
    "error": {
      "examples": [
        {
          "title": "Internal server error:",
          "content": "HTTP/1.1 500 Internal server error\n {\n   \"error\": {\n     \"code\": \"500\",\n     \"message\": \"Internal server error\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Bad request:",
          "content": "HTTP/1.1 400 Bad request\n {\n   \"error\": {\n     \"code\": \"400\",\n     \"message\": \"Bad request\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Not Found\"\n}",
          "type": "json"
        },
        {
          "title": "Not Authenticated:",
          "content": "HTTP/1.1 401 Not Authenticated\n {\n   \"error\": \"No Access Right\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/{managerId}",
    "title": "Update Manager Info",
    "version": "1.0.0",
    "name": "Update_Manager",
    "group": "Manager",
    "description": "<p>Manager update data - update data</p>",
    "parameter": {
      "fields": {
        "path": [
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "managerId",
            "description": "<p>Manager id</p>"
          }
        ],
        "body": [
          {
            "group": "body",
            "type": "String",
            "optional": true,
            "field": "email",
            "description": "<p>Manager email</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": true,
            "field": "password",
            "description": "<p>Manager password</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": true,
            "field": "firstName",
            "description": "<p>Manager firstname</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": true,
            "field": "lastName",
            "description": "<p>Manager lastname</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": true,
            "field": "phone",
            "description": "<p>Manager phone</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "HttpStatus",
            "description": "<p>200 if everything is ok</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Manager",
            "description": "<p>Updated manager { &quot;_id&quot;: &quot;a-d.x-;s-39;x-s9-3la-fl2&quot;, &quot;firstName&quot;: &quot;John&quot;, &quot;lastName&quot;: &quot;Doe&quot;, &quot;phone&quot;: &quot;060/123456&quot;, &quot;email&quot;: &quot;johndoe@gmail.com&quot;, &quot;password&quot;: &quot;a3-xjd=-s,;kfga=dg&quot; }</p>"
          }
        ]
      }
    },
    "filename": "services/module_manager/router.js",
    "groupTitle": "Manager",
    "error": {
      "examples": [
        {
          "title": "Internal server error:",
          "content": "HTTP/1.1 500 Internal server error\n {\n   \"error\": {\n     \"code\": \"500\",\n     \"message\": \"Internal server error\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Not Found\"\n}",
          "type": "json"
        },
        {
          "title": "Bad request:",
          "content": "HTTP/1.1 400 Bad request\n {\n   \"error\": {\n     \"code\": \"400\",\n     \"message\": \"Bad request\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Not Authenticated:",
          "content": "HTTP/1.1 401 Not Authenticated\n {\n   \"error\": \"No Access Right\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/register",
    "title": "Register user",
    "version": "1.0.0",
    "name": "Register_User",
    "group": "User",
    "description": "<p>User register - register user account</p>",
    "parameter": {
      "fields": {
        "body": [
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Manager email</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Manager password</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": true,
            "field": "firstName",
            "description": "<p>Manager firstname</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": true,
            "field": "lastName",
            "description": "<p>Manager lastname</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": true,
            "field": "phone",
            "description": "<p>Manager phone</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "HttpStatus",
            "description": "<p>200 if everything is ok</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "User",
            "description": "<p>Created user { &quot;_id&quot;: &quot;a-d.x-;s-39;x-s9-3la-fl2&quot;, &quot;firstName&quot;: &quot;John&quot;, &quot;lastName&quot;: &quot;Doe&quot;, &quot;phone&quot;: &quot;060/123456&quot;, &quot;email&quot;: &quot;johndoe@gmail.com&quot;, &quot;password&quot;: &quot;a3-xjd=-s,;kfga=dg&quot; }</p>"
          }
        ]
      }
    },
    "filename": "services/module_user/router.js",
    "groupTitle": "User",
    "error": {
      "examples": [
        {
          "title": "Internal server error:",
          "content": "HTTP/1.1 500 Internal server error\n {\n   \"error\": {\n     \"code\": \"500\",\n     \"message\": \"Internal server error\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Already registered:",
          "content": "HTTP/1.1 406 You are already registered\n {\n   \"error\": {\n     \"code\": \"406\",\n     \"message\": \"You are already registered\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Bad request:",
          "content": "HTTP/1.1 400 Bad request\n {\n   \"error\": {\n     \"code\": \"400\",\n     \"message\": \"Bad request\"\n   }\n }",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/{userId}/requests",
    "title": "User Add Request",
    "version": "1.0.0",
    "name": "User_Add_Request",
    "group": "User",
    "description": "<p>User add request - create new request</p>",
    "parameter": {
      "fields": {
        "path": [
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>User id</p>"
          }
        ],
        "body": [
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "startLocation",
            "description": "<p>Vehicle license plate</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "endLocation",
            "description": "<p>Vehicle license expire date</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "HttpStatus",
            "description": "<p>200 if everything is ok</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "DestinationRequest",
            "description": "<p>Created request { &quot;_id&quot;: &quot;a-d.x-;s-39;x-s9-3la-fl2&quot;, &quot;status&quot;: &quot;submitted&quot;, &quot;submissionDate&quot;: &quot;2018-03-01&quot;, &quot;startLocation&quot; : { &quot;lat&quot;: &quot;45.30&quot;, &quot;lng&quot;: &quot;45.30&quot; }, &quot;endLocation&quot;: { &quot;lat&quot;: &quot;45.31&quot;, &quot;lng&quot;: &quot;45.31&quot; }, &quot;userId&quot;: &quot;asdf32-sdfa032-asdfsa&quot; }</p>"
          }
        ]
      }
    },
    "filename": "services/module_user/router.js",
    "groupTitle": "User",
    "error": {
      "examples": [
        {
          "title": "Internal server error:",
          "content": "HTTP/1.1 500 Internal server error\n {\n   \"error\": {\n     \"code\": \"500\",\n     \"message\": \"Internal server error\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Bad request:",
          "content": "HTTP/1.1 400 Bad request\n {\n   \"error\": {\n     \"code\": \"400\",\n     \"message\": \"Bad request\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Not Found\"\n}",
          "type": "json"
        },
        {
          "title": "Not Authenticated:",
          "content": "HTTP/1.1 401 Not Authenticated\n {\n   \"error\": \"No Access Right\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/{userId}/changePassword",
    "title": "User Change Password",
    "version": "1.0.0",
    "name": "User_Change_Password",
    "group": "User",
    "description": "<p>User change password - change existing password</p>",
    "parameter": {
      "fields": {
        "path": [
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>User id</p>"
          }
        ],
        "body": [
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "oldPassword",
            "description": "<p>User's old password</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "newPassword",
            "description": "<p>User's new password</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "repeatPassword",
            "description": "<p>User's new rpassword repeated</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "HttpStatus",
            "description": "<p>200 if everything is ok</p>"
          }
        ]
      }
    },
    "filename": "services/module_user/router.js",
    "groupTitle": "User",
    "error": {
      "examples": [
        {
          "title": "Internal server error:",
          "content": "HTTP/1.1 500 Internal server error\n {\n   \"error\": {\n     \"code\": \"500\",\n     \"message\": \"Internal server error\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Bad request:",
          "content": "HTTP/1.1 400 Bad request\n {\n   \"error\": {\n     \"code\": \"400\",\n     \"message\": \"Bad request\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Not Authenticated:",
          "content": "HTTP/1.1 401 Not Authenticated\n {\n   \"error\": \"No Access Right\"\n}",
          "type": "json"
        },
        {
          "title": "Not allowed:",
          "content": "HTTP/1.1 405 Not allowed\n {\n   \"error\": {\n   \"code\": \"405\",\n     \"message\": \"Not allowed\"\n }\n }",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Not Found\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/{userId}/changeEmail",
    "title": "User Change Email",
    "version": "1.0.0",
    "name": "User_Change_Password",
    "group": "User",
    "description": "<p>User change password - change existing password</p>",
    "parameter": {
      "fields": {
        "path": [
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>User id</p>"
          }
        ],
        "body": [
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "oldEmail",
            "description": "<p>User's old email</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "newEmail",
            "description": "<p>User's new email</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "HttpStatus",
            "description": "<p>200 if everything is ok</p>"
          }
        ]
      }
    },
    "filename": "services/module_user/router.js",
    "groupTitle": "User",
    "error": {
      "examples": [
        {
          "title": "Internal server error:",
          "content": "HTTP/1.1 500 Internal server error\n {\n   \"error\": {\n     \"code\": \"500\",\n     \"message\": \"Internal server error\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Bad request:",
          "content": "HTTP/1.1 400 Bad request\n {\n   \"error\": {\n     \"code\": \"400\",\n     \"message\": \"Bad request\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Not Authenticated:",
          "content": "HTTP/1.1 401 Not Authenticated\n {\n   \"error\": \"No Access Right\"\n}",
          "type": "json"
        },
        {
          "title": "Not allowed:",
          "content": "HTTP/1.1 405 Not allowed\n {\n   \"error\": {\n   \"code\": \"405\",\n     \"message\": \"Not allowed\"\n }\n }",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Not Found\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/login",
    "title": "User Login",
    "version": "1.0.0",
    "name": "User_Login",
    "group": "User",
    "description": "<p>User login - login to account</p>",
    "parameter": {
      "fields": {
        "body": [
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "HttpStatus",
            "description": "<p>200 if everything is ok</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>User token - expiration time one day { &quot;token&quot;: &quot;23042016MSSSU2-032AE0AA&quot; }</p>"
          }
        ]
      }
    },
    "filename": "services/module_user/router.js",
    "groupTitle": "User",
    "error": {
      "examples": [
        {
          "title": "Internal server error:",
          "content": "HTTP/1.1 500 Internal server error\n {\n   \"error\": {\n     \"code\": \"500\",\n     \"message\": \"Internal server error\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Bad request:",
          "content": "HTTP/1.1 400 Bad request\n {\n   \"error\": {\n     \"code\": \"400\",\n     \"message\": \"Bad request\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Invalid username/password:",
          "content": "HTTP/1.1 409 Invalid username/password\n {\n   \"error\": {\n     \"code\": \"409\",\n     \"message\": \"Invalid username/password\"\n   }\n }",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/{userId}/requests",
    "title": "User Requests",
    "version": "1.0.0",
    "name": "User_Requests",
    "group": "User",
    "description": "<p>User get all requests - get all requests for specific user</p>",
    "parameter": {
      "fields": {
        "path": [
          {
            "group": "path",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>User id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "HttpStatus",
            "description": "<p>200 if everything is ok</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "DestinationRequests",
            "description": "<p>Requests for user [ { &quot;_id&quot;: &quot;a-d.x-;s-39;x-s9-3la-fl2&quot;, &quot;status&quot;: &quot;submitted&quot;, &quot;submissionDate&quot;: &quot;2018-03-01&quot;, &quot;startLocation&quot; : { &quot;lat&quot;: &quot;45.30&quot;, &quot;lng&quot;: &quot;45.30&quot; }, &quot;endLocation&quot;: { &quot;lat&quot;: &quot;45.31&quot;, &quot;lng&quot;: &quot;45.31&quot; }, &quot;userId&quot;: &quot;asdf32-sdfa032-asdfsa&quot; }, { &quot;_id&quot;: &quot;add.x-;s-39;x-s9-3la-ab3&quot;, &quot;status&quot;: &quot;submitted&quot;, &quot;submissionDate&quot;: &quot;2018-03-01&quot;, &quot;startLocation&quot; : { &quot;lat&quot;: &quot;45.32&quot;, &quot;lng&quot;: &quot;45.32&quot; }, &quot;endLocation&quot;: { &quot;lat&quot;: &quot;45.33&quot;, &quot;lng&quot;: &quot;45.33&quot; }, &quot;userId&quot;: &quot;asdf32-sdfa032-asdfsa&quot; } ]</p>"
          }
        ]
      }
    },
    "filename": "services/module_user/router.js",
    "groupTitle": "User",
    "error": {
      "examples": [
        {
          "title": "Internal server error:",
          "content": "HTTP/1.1 500 Internal server error\n {\n   \"error\": {\n     \"code\": \"500\",\n     \"message\": \"Internal server error\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Not Found\"\n}",
          "type": "json"
        },
        {
          "title": "Not Authenticated:",
          "content": "HTTP/1.1 401 Not Authenticated\n {\n   \"error\": \"No Access Right\"\n}",
          "type": "json"
        }
      ]
    }
  }
] });
