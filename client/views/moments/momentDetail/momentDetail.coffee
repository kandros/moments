Template.momentDetail.events
  "click .remove": ->
    currentMoment = Session.get("currentMoment")
    if confirm "Cancellare #{currentMoment.text} ?"
      Meteor.call "removeMoment", currentMoment._id
      $(".sliding-moment-container").removeClass "visible"
