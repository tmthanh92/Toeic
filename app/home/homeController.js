/**
 * Created by MyPC on 4/23/2016.
 */

(function () {
  'use strict';

  var app = angular.module('app');

  app.controller('HomeController', HomeController);

  HomeController.inject = ['UserService'];

  function HomeController(UserService) {
    var vm = this;
    vm.sendContact = sendContact;

    function sendContact() {
      UserService.SendContactInfo(vm.contact);
    }

   /* app.directive('mySlider', function() {
        return {
          restrict: 'EA',
          link: function(scope, element, attrs) {
            angular.element(element).flexslider(scope.$eval(attrs.mySlider));

            scope.$on("destroy", function() {
                element.flexslider("destroy");
            })
          }
        }
    })*/

    $('.flexslider').flexslider({
      animation: "slide",
      controlNav: false,
      start: function (slider) {
        $('body').removeClass('loading');
      }
    });
    
  }
})();
