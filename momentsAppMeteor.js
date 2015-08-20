Moments = new Mongo.Collection("moments");

if (Meteor.isClient) {

  Template.registerHelper('formatDate', function (date) {
    var options = {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }
    return new Date(date).toLocaleDateString('it-IT', options);
  });

  Template.body.helpers({
    moments: function () {
      return Moments.find({});
    },
    momentsCount: function () {
      return Moments.find({}).count();
    }
  });

  // Template.moment.helpers({
  //   myId: function () {
  //     return this._id;
  //   }
  // });

  Template.body.events({
    "submit .new-moment": function (event) {
      event.preventDefault();

      var inputText = event.target.text.value;

      Meteor.call("insertMoment", inputText);

      event.target.text.value = "";
    }
  });

  Template.moment.events({
    "click .remove": function () {
      if (confirm("Cancellare " + this.text + "?")) {
        Meteor.call("removeMoment", this._id);
      }
    }
  });
}

Meteor.methods({
  insertMoment: function (text) {
    Moments.insert({
      text: text,
      createdAt: new Date()
    });
  },
  removeMoment: function (momentId) {
    Moments.remove(momentId);
  }
});

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
