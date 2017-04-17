(function(){


  var $window     = $(window),
      $html       = $(document.documentElement),
      $body       = $(document.body),
      $header     = $('.js-header'),
      $menuButton = $('.js-menu-button');



  //
  // Toggle Mobile Menu
  //
  if($menuButton.length){
    $menuButton.on('click', function(e) {
      e.preventDefault();
      $body.toggleClass('no-scroll');
      $header.toggleClass('menu-is-open');
      $(this).toggleClass('is-open');
    });
  }



  //
  // Accordion
  //
  if($('.js-panel-link').length){
    $('.js-panel-link').on('click', function(e){
      e.preventDefault();
      var el = $(this).parent();

      if( el.hasClass('panel__item--open') ){
        el.removeClass('panel__item--open');
      }
      else {
        $('.panel__item').removeClass('panel__item--open');
        el.toggleClass('panel__item--open');
      }
    });
  }



})(); // doc.ready end
