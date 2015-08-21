Moments = new Mongo.Collection("moments");

if (Meteor.isClient) {

  Template.registerHelper('formatDate', function (date) {
    var options = {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    };
    return new Date(date).toLocaleDateString('it-IT', options);
  });

  Template.body.helpers({
    moments: function () {
      return Moments.find({}, {sort: {createdAt: -1}});
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
    },
    "click .remove-all": function () {
      if (confirm("Svuotare il database?")) {
        Meteor.call("removeAll");
      }
    },
    "click .create-dummy": function () {
      Meteor.call("createDummy");
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
  },
  removeAll: function () {
    Moments.remove({});
  },
  createDummy: function () {
    for (var i = 0; i < 10; i++) {
      Moments.insert({
        text: "text " + i,
        createdAt: new Date()
      });
    }
  }
});

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
