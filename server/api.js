  // Global Api configuration
  var Api = new Restivus({
    prettyJson: true
  });

  // Generates: GET, POST on /api/items and GET, PUT, DELETE on
  // /api/items/:id for the Moments collection
  Api.addCollection(Moments);
