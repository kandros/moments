Template.momentDetail.events
  "click .remove": ->
    if confirm "Cancellare #{Session.get('currentMoment').text} ?"
      Meteor.call "removeMoment", Session.get("currentMoment")._id
      $(".sliding-moment-container").removeClass "visible"
