/**
 * Created by MyPC on 4/23/2016.
 */

(function () {
  'use strict';

  var app = angular.module('app');

  app.controller('HomeController', HomeController);
  app.controller('PopupController', PopupController);

  HomeController.inject = ['UserService', '$uibModal'];

  function HomeController(UserService, $uibModal) {
    var vm = this;
    vm.isContactSubmit = false;
    vm.showCourseDetail = showCourseDetail;
    vm.sendContact = sendContact;

    function sendContact() {
      UserService.SendContactInfo(vm.contact);
    }

    function showCourseDetail(templateName, controllerName) {
        /*$('#myModal').modal('show');*/
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: templateName,
        controller: controllerName,
        windowClass: 'modal-window',
        resolve: {
          items: function () {
            return vm.person;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        vm.selected = selectedItem;
      })
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

    /*$('.flexslider').flexslider({
      animation: "slide",
      controlNav: false,
      itemWidth: 1100,
      start: function (slider) {
        $('body').removeClass('loading');
      }
    });*/
    
  }

  function PopupController($scope, $uibModalInstance, items) {
    $scope.modalCancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }

  // app.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {
  //
  //
  //
  //   $scope.ok = function () {
  //     $uibModalInstance.close();
  //   };
  //
  //   $scope.modalCancel = function () {
  //     $uibModalInstance.dismiss('cancel');
  //   };
  // });
})();
