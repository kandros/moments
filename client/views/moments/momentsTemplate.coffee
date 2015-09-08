Template.momentsTemplate.events
  "submit .new-moment": (event) ->
    event.preventDefault
    inputText = event.target.text.value

    Meteor.call "insertMoment", inputText

    return event.target.text.value = ""

  "click .remove-all": () ->
    if confirm "Svuotare il database?"
      return Meteor.call "removeAll"
  "click .create-dummy": () ->
    return Meteor.call "createDummy"
