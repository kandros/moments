API = {
  methods: {
    moments: {
      GET: function (context, connection) {
        var hasQuery = API.utility.hasData(connection.data);

        if (hasQuery) {
          connection.data.owner = connection.owner;
          var getMoments = Moments.find(connection.data).fetch();

          if (getMoments.length > 0) {
            API.utility.response(context, 200, getMoments);
          } else {
            API.utility.response(context, 404, {
              error: 404,
              message: "No pizzas found, dude."
            });
          }
        } else {
          var getMoments = Moments.find({
            "owner": connection.owner
          }).fetch();
          API.utility.response(context, 200, getMoments);
        }
      },
      POST: function (context, connection) {
        var hasData = API.utility.hasData(connection.data),
          validData = API.utility.validate(connection.data, {
            "name": String,
            "crust": String,
            "toppings": [String]
          });

        if (hasData && validData) {
          connection.data.owner = connection.owner;
          var pizza = Moments.insert(connection.data);
          API.utility.response(context, 200, {
            "_id": pizza,
            "message": "Pizza successfully created!"
          });
        } else {
          API.utility.response(context, 403, {
            error: 403,
            message: "POST calls must have a name, crust, and toppings passed in the request body in the correct formats."
          });
        }
      },
      PUT: function () {
        var hasQuery = API.utility.hasData(connection.data),
          validData = API.utility.validate(connection.data, Match.OneOf({
            "_id": String,
            "name": String
          }, {
            "_id": String,
            "crust": String
          }, {
            "_id": String,
            "toppings": [String]
          }, {
            "_id": String,
            "name": String,
            "crust": String
          }, {
            "_id": String,
            "name": String,
            "toppings": [String]
          }, {
            "_id": String,
            "crust": String,
            "toppings": [String]
          }, {
            "_id": String,
            "name": String,
            "crust": String,
            "toppings": [String]
          }));

        if (hasQuery && validData) {
          var momentId = connection.data._id;
          delete connection.data._id;

          var getMoment = Moments.findOne({
            "_id": momentId
          }, {
            fields: {
              "_id": 1
            }
          });

          if (getMoment) {
            Moments.update({
              "_id": momentId
            }, {
              $set: connection.data
            });
            API.utility.response(context, 200, {
              "message": "Pizza successfully updated!"
            });
          } else {
            API.utility.response(context, 404, {
              "message": "Can't update a non-existent pizza, homeslice."
            });
          }
        } else {
          API.utility.response(context, 403, {
            error: 403,
            message: "PUT calls must have a pizza ID and at least a name, crust, or toppings passed in the request body in the correct formats (String, String, Array)."
          });
        }
      },
      DELETE: function (context, connection) {
        var hasQuery = API.utility.hasData(connection.data),
          validData = API.utility.validate(connection.data, {
            "_id": String
          });

        if (hasQuery && validData) {
          var momentId = connection.data._id;
          var getMoment = Moments.findOne({
            "_id": momentId
          }, {
            fields: {
              "_id": 1
            }
          });

          if (getMoment) {
            Moments.remove({
              "_id": momentId
            });
            API.utility.response(context, 200, {
              "message": "Pizza removed!"
            });
          } else {
            API.utility.response(context, 404, {
              "message": "Can't delete a non-existent pizza, homeslice."
            });
          }
        } else {
          API.utility.response(context, 403, {
            error: 403,
            message: "DELETE calls must have an _id (and only an _id) in the request body in the correct format (String)."
          });
        }
      }

    }
  },
  connection: function (request) {
    var getRequestContents = API.utility.getRequestContents(request);
    return {
      data: getRequestContents
    };
  },
  handleRequest: function (context, resource, method) {
    var connection = API.connection(context.request);
    if (!connection.error) {
      API.methods[resource][method](context, connection);
    } else {
      API.utility.response(context, 401, connection);
    }
  },
  utility: {
    getRequestContents: function (request) {
      switch (request.method) {
        case "GET":
          return request.query;
        case "POST":
        case "PUT":
        case "DELETE":
          return request.body;
      }
    },
    response: function (context, statusCode, data) {
      context.response.setHeader('Content-Type', 'application/json');
      context.response.statusCode = statusCode;
      context.resource.end(JSON.stringify(data));
    },
    hasData: function (data) {
      return Object.keys(data).length > 0 ? true : false;
    },
    validate: function (data, pattern) {
      return Match.test(data, pattern);
    }
  }
};
