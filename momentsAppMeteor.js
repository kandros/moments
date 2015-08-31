Moments = new Mongo.Collection("moments");

function setSessionLatLon() {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      Session.set('position', {
        lat: position.coords.latitude,
        lon: position.coords.longitude
      });
    },
    function (error) {
      // alert(error.message);
    }
  );
}


function getAddress(latLon, callback) {
  var lat = latLon.lat;
  var lng = latLon.lon;
  var latlng = new google.maps.LatLng(lat, lng);
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({
    'latLng': latlng
  }, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      if (results[1]) {
        alert(results[1].formatted_address);
      }
    }
  });
}

if (Meteor.isClient) {

  Meteor.subscribe("moments");

  $(function () {
    $('.modal').on('shown.bs.modal', function () {
      $(this).find('[autofocus]').focus();
    });
  });

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
      return Moments.find({}, {
        sort: {
          createdAt: -1
        }
      });
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

  // Template.floatingActionButtons.helpers({
  //   momentsNotEmpty: function () {
  //     var momentsCount = Moments.find({}).count();
  //     if (momentsCount > 0) {
  //       alert();
  //       return true;
  //     }
  //   }
  // });


  Template.body.events({
    "submit .new-moment": function (event) {
      event.preventDefault();
      setSessionLatLon();
      var position = Session.get('position') || "noLocation";
      var address = getAddress(position);

      alert(position);

      var inputText = event.target.text.value;


      // Meteor.call("insertMoment", inputText, position, address);




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
  insertMoment: function (text, position) {
    Moments.insert({
      text: text,
      position: position,
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
        position: "45.676494299999995,9.4886792",
        createdAt: new Date()
      });
    }
  }
});

if (Meteor.isServer) {
  Meteor.publish( "moments", function () {
    return Moments.find({});
  });
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
