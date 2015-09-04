API  = {
  connection: function ( request ) {
    var getRequestContents = API.utility.getRequestContents( request );
    return  { data : getRequestContents };
  },
  handleRequest: function( context, resource, method ) {
    var connection = API.connection( context.request  );
    if ( !connection.error  ) {
      API.methods [ resource ][ methods ]( context , connection );
    } else {
      API.utility.response( context, 401, connection );
    }
  },
  utility: {
    getRequestContents: function ( request ) {
      switch ( request.method ) {
        case "GET":
          return request.query;
        case "POST":
        case "PUT":
        case "DELETE":
          return request.body;
      }
    }
  }

};
