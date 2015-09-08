Moments = new Mongo.Collection("moments");

if (Meteor.isClient) {
  Meteor.subscribe("moments");
}

if (Meteor.isServer) {
  Meteor.publish("moments", function () {
    return Moments.find({});
  });
}
