
// function setSessionLatLon() {
//   navigator.geolocation.getCurrentPosition(
//     function (position) {
//       Session.set('position', {
//         lat: position.coords.latitude,
//         lon: position.coords.longitude
//       });
//     },
//     function (error) {
//       // alert(error.message);
//     }
//   );
// }
//
//
// function getAddress(latLon, callback) {
//   var lat = latLon.lat;
//   var lng = latLon.lon;
//   var latlng = new google.maps.LatLng(lat, lng);
//   var geocoder = new google.maps.Geocoder();
//   geocoder.geocode({
//     'latLng': latlng
//   }, function (results, status) {
//     if (status == google.maps.GeocoderStatus.OK) {
//       if (results[1]) {
//         alert(results[1].formatted_address);
//       }
//     }
//   });
// }

if (Meteor.isClient) {

  $(function () {
    $('.modal').on('shown.bs.modal', function () {
      $(this).find('[autofocus]').focus();
    });
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
