Template.moment.events
  "click .more-info": ->
    Session.set("currentMoment", this)
    $(".sliding-moment-container").addClass "visible"
