API  = {
  connection: function ( request ) {
    var getRequestContentes = API.utility.getRequestContents( request );
    return  { data : getRequestContentes };
  },
  handleRequest: function( context, resource, method ) {
    var connection = API.connection( context.request  );
    if ( !connection.error  ) {
      API.methods [ resource ][ methods ]( context , connection );
    } else {
      API.utility.response( context, 401, connection );
    }
  }

};
