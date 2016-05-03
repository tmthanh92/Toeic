/**
 * @name Site
 * @description Define global variables and functions
 * @version 1.0
 */
var Site = (function($, window, undefined) {
  var privateVar = 1;

  function privateMethod1() {
    // todo
  }

  return {
    publicVar: 1,
    publicObj: {
      var1: 1,
      var2: 2
    },
    publicMethod1: privateMethod1
  };

})(jQuery, window);

jQuery(function() {
  Site.publicMethod1();
});

(function ($) {

  // Back to top
  jQuery(window).scroll(function () {
    if (jQuery(this).scrollTop() > 1) {
      jQuery('.dmtop').css({ bottom: "25px" });
    } else {
      jQuery('.dmtop').css({ bottom: "-100px" });
    }
  });
  jQuery('.back-to-top').click(function () {
    jQuery('html, body').animate({ scrollTop: '0px' }, 800);
    return false;
  });

  //Tooltips 
  $('.topbar, .social, .image-caption, .bs-example-tooltips').tooltip({
    selector: "[data-toggle=tooltip]",
    container: "body"
  });



  // DM Menu
  jQuery('#nav').affix({
    offset: { top: $('#nav').offset().top }
  });


  $('#jetmenu').jetmenu();

  // Search
  var $ctsearch = $('#dmsearch'),
    $ctsearchinput = $ctsearch.find('input.dmsearch-input'),
    $body = $('html,body'),
    openSearch = function () {
      $ctsearch.data('open', true).addClass('dmsearch-open');
      $ctsearchinput.focus();
      return false;
    },
    closeSearch = function () {
      $ctsearch.data('open', false).removeClass('dmsearch-open');
    };

  $ctsearchinput.on('click', function (e) {
    e.stopPropagation();
    $ctsearch.data('open', true);
  });

  $ctsearch.on('click', function (e) {
    e.stopPropagation();
    if (!$ctsearch.data('open')) {

      openSearch();

      $body.off('click').on('click', function (e) {
        closeSearch();
      });

    } else {
      if ($ctsearchinput.val() === '') {
        closeSearch();
        return false;
      }
    }
  });
})(jQuery);

/**
 *  @name plugin
 *  @description description
 *  @version 1.0
 *  @options
 *    option
 *  @events
 *    event
 *  @methods
 *    init
 *    publicMethod
 *    destroy
 */
;(function($, window, undefined) {
  var pluginName = 'plugin';  
  var privateVar = null;
  var privateMethod = function() {

  };

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this;
      // initialize
      // add events
    },
    publicMethod: function(params) {
      // to do      
      this.element.trigger('customEvent');
    },
    destroy: function() {      
      // deinitialize
      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function(options, params) {
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      } else {
        window.console && console.log(options ? options + ' method is not exists in ' + pluginName : pluginName + ' plugin has been initialized');
      }
    });
  };

  $.fn[pluginName].defaults = {
    key: 'value'
  };

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]({
      key: 'custom'
    });
    $('[data-' + pluginName + ']').on('customEvent', function(){
      // to do
    });
  });

}(jQuery, window));
