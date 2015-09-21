Template.moment.events
  "click .remove": ->
    if confirm "Cancellare #{@text} ?"
      Meteor.call "removeMoment", @_id
  "click .more-info": ->
    Session.set("currentMoment", this)
    $(".sliding-moment-container").addClass "visible"
