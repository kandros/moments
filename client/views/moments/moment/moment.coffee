Template.moment.events
  "click .remove": ->
    if confirm "Cancellare #{@text} ?"
      Meteor.call "removeMoment", @_id
