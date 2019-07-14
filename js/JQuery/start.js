jQuery(document).ready(function($) {
  $('nav').on('click', function() {
    if ( $(this).hasClass('navDown') ) {
      var movePos = $(window).scrollTop() + $(window).height();
    }
    $('html, body').animate({scrollTop: movePos}, 600);
  });
});