$(document).ready(function(){

  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
        $('#back-to-top').fadeIn();
    } else {
        $('#back-to-top').fadeOut();
    }
  });

  $("#back-to-top").on('click', function(event) {
      event.preventDefault();
      $('html, body').animate({scrollTop: 0}, 800);
      return false;
  });

  $("a.scroll").on('click', function(event) {

    if (this.hash !== "") {
      event.preventDefault();

      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){

      });
    } // End if
  });
  
  $('.swipebox').swipebox({
    hideBarsDelay : 0 // delay before hiding bars on desktop
  }
  );

});

