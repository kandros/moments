$(function () {
  var $fabButtons = $('.start-hidden');
  $('.fixed-fab-container').on('mouseenter', function () {
    var height = 56;
    var spacing = 5;
    $fabButtons.each(function () {
      var dataFab = $(this).data('fab');
      $(this).css({
        bottom: 61 * dataFab,
        opacity: 1,
        'z-index': 100 - dataFab
      });
    });
  });
  $('.fixed-fab-container').on('mouseleave', function () {
    $fabButtons.each(function () {
      var dataFab = $(this).data('fab');
      $(this).css({
        bottom: 0,
        opacity: 0
      });
    });
  });
});
