Moments = new Mongo.Collection("moments");

if (Meteor.isClient) {
  Template.body.helpers({
    moments: function () {
      return Moments.find({});
    }
  });

  Template.body.events({
    "submit .new-moment": function (event) {
      event.preventDefault();

      var inputText = event.target.text.value;

      Moments.insert({
        text: inputText,
        createdAt: new Date()
      });

      event.target.text.value = "";
    }
  });

  Template.moment.events({
    "click .delete": function () {
      if (confirm("Remove " + this.text + "?")) {
        Moments.remove(this._id);
      }
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
