// SCB static - Firebelly 2015

// good design for good reason for good namespace
var SCB = (function($) {

  var screen_width = 0,
      breakpoint_small = false,
      breakpoint_medium = false,
      breakpoint_large = false,
      breakpoint_huge = false,
      $content,
      $backnav,
      $body,
      $document,
      $nav;

  function _init() {
      // set screen size vars
      _resize();

      $document = $(document);
      $body = $('body');
      $content = $('#main-content');
      $nav = $('.site-nav');

      // init behavior for various sections
      // _initSearch();
      _initNav();

      // Esc handlers
      $(document).keyup(function(e) {
        if (e.keyCode === 27) {
          _hideNav();
        }
      });
  }

  function _scrollBody(element, duration, delay) {
    if ($('#wpadminbar').length) {
      wpOffset = $('#wpadminbar').height();
    } else {
      wpOffset = 0;
    }
    element.velocity("scroll", { 
      duration: duration,
      delay: delay,
      offset: -wpOffset
    }, "easeOutSine");
  }

  function _initSearch() {
    $('.search-toggle, .internal-search-toggle').on('click', function (e) {
      e.preventDefault();
      if (!$('.search-wrap').hasClass('active')) {
        $('.search-wrap').addClass('active'); 
        $('.search-form input').focus(); 
      } else {
        _hideSearch();
      }
    });

    $body.on('click', '.search-container', function(e) {
      if (!$(e.target).is('.search-field')) {
        _hideSearch();
      }
    });
  }

  function _hideSearch() {
    $('.search-wrap').removeClass('active');
  }

  function _initNav() {
    $('.nav-toggle').on('click', function() {
      $(this).toggleClass('-active');
      if (!$('.site-nav-wrap').is('.-active')) {
        _showNav();
      } else {
        _hideNav();
      }
    });

    // Give number classes to nav items (this should probably be done in php)
    var navItem = $('.site-nav li');
    var navItems = $.makeArray(navItem);
    var navCount = navItems.length;
    navItems.forEach(function(v, i) {
      $('.site-nav li').eq(i).addClass('nav-item-' + navCount--);
    });
  }

  function _showNav() {
    $('.site-nav-wrap').removeClass('-inactive').addClass('-active');
  }

  function _hideNav() {
    $('.site-nav-wrap').removeClass('-active').addClass('-inactive');
  }

  function _isEmail(str) {
    var isEmail  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return isEmail.test(str);
  }

  // track ajax pages in Analytics
  function _trackPage() {
    if (typeof ga !== 'undefined') { ga('send', 'pageview', document.location.href); }
  }

  // track events in Analytics
  function _trackEvent(category, action) {
    if (typeof ga !== 'undefined') { ga('send', 'event', category, action); }
  }

  // called in quick succession as window is resized
  function _resize() {
    screenWidth = document.documentElement.clientWidth;
    breakpoint_small = (screenWidth > 480);
    breakpoint_medium = (screenWidth > 768);
    breakpoint_large = (screenWidth > 1024);
    breakpoint_huge = (screenWidth > 3000);
  }

  function _scroll() {
    var scrolltop = $(window).scrollTop();

    // fade & slide up tagline
    $('#tagline').css('opacity', 1/(scrolltop/25));
    $('#tagline').css('transform','translateY(-'+(scrolltop/3)+'px)');
  }

  // public functions
  return {
    init: _init,
    resize: _resize,
    scroll: _scroll,
    scrollBody: function(section, duration, delay) {
      _scrollBody(section, duration, delay);
    }
  };

})(jQuery);

// fire up the mothership
jQuery(document).ready(SCB.init);
// zig-zag the mothership
jQuery(window).resize(SCB.resize);
jQuery(window).on('DOMMouseScroll mousewheel scroll', SCB.scroll);
