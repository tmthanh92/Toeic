/**
 * Created by MyPC on 4/23/2016.
 */

(function() {
  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController);

  function HomeController() {
    var vm = this;
    
    $('.flexslider').flexslider({
      animation: "slide",
      controlNav: false,
      start: function(slider) {
        $('body').removeClass('loading');
      }
    });

  }
})();
