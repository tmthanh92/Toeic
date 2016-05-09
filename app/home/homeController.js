/**
 * Created by MyPC on 4/23/2016.
 */

(function () {
  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController);

  HomeController.inject = ['UserService'];
  function HomeController(UserService) {
    var vm = this;
    vm.sendContact = sendContact;

    function sendContact() {
      UserService.SendContactInfo(vm.contact);
    }

    $('.flexslider').flexslider({
      animation: "slide",
      controlNav: false,
      start: function (slider) {
        $('body').removeClass('loading');
      }
    });
    
  }
})();
