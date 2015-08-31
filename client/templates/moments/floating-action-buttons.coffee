$ ->
  $fabButtons = $('.fab--start-hidden')
  $fixedFabContainer = $('.fixed-fab-container')
  $fixedFabContainer.on 'mouseenter', ->
    height = 56
    spacing = 5
    $fabButtons.each ->
      dataFab = $(this).data('fab')
      $(this).css
        bottom: 61 * dataFab
        opacity: 1
        'z-index': 100 - dataFab
      return
    return
  $fixedFabContainer.on 'mouseleave', ->
    $fabButtons.each ->
      dataFab = $(this).data('fab')
      $(this).css
        bottom: 0
        opacity: 0
      return
    return
  return
