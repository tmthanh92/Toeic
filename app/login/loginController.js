/**
 * Created by MyPC on 4/22/2016.
 */
(function() {
  'use strict';

  function LoginController($location, AuthenticationService, FlashService, UserService) {
    var vm = this;

    function login() {
      vm.dataLoading = true;
      AuthenticationService.Login(vm.username, vm.password, function(response) {
        if (response.success) {
          AuthenticationService.SetCredentials(vm.username, vm.password);
          $location.path('/home');
        } else {
          FlashService.Error(response.message);
          vm.dataLoading = false;
        }
      });
    }

    function register() {
      vm.dataLoading = true;
      UserService.Create(vm.user)
        .then(function(response) {
          if (response.success) {
            FlashService.Success('Registration successful', true);
            $location.path('/login');
          } else {
            FlashService.Error(response.message);
            vm.dataLoading = false;
          }
        });
    }

    function logOut() {
      $location.path('/login');
    }

    vm.login = login;
    vm.register = register;
    vm.logOut = logOut;
  }

  LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService', 'UserService'];

  angular
    .module('app')
    .controller('LoginController', LoginController);
}());
