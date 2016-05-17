/**
 * Created by MyPC on 4/22/2016.
 */
(function() {
  'use strict';

  function LoginController($location, AuthenticationService, FlashService, UserService, FbLoginService, GoogleLoginService) {
    var vm = this;

    vm.isLoggingIn = false;
    function login() {
      vm.dataLoading = true;
      AuthenticationService.Login(vm.username, vm.password, function(response) {
        if (response.success) {
          AuthenticationService.SetCredentials(vm.username, vm.password);
          $location.path('/home');
          vm.isLoggingIn = true;
        } else {
        /*  FlashService.Error(response.message);
          vm.dataLoading = false;*/
          vm.isLoggingIn = false;
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
      vm.isLoggingIn = false;
    }



  /*  function fbLogin() {
      FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
          // the user is logged in and has authenticated your
          // app, and response.authResponse supplies
          // the user's ID, a valid access token, a signed
          // request, and the time the access token
          // and signed request each expire
          var uid = response.authResponse.userID;
          var accessToken = response.authResponse.accessToken;
          console.log('Welcome!  Fetching your information.... ');
          FB.api('/me', function(response) {
            console.log('Successful login for: ' + response.name);
           console.log( 'Thanks for logging in, ' + response.name + '!');
          });
        } else if (response.status === 'not_authorized') {
          // the user is logged in to Facebook,
          // but has not authenticated your app
        } else {
          // the user isn't logged in to Facebook.
          FB.login(function(response) {
            if (response.authResponse) {
              console.log('Welcome!  Fetching your information.... ');
              FB.api('/me', function(response) {
                console.log('Good to see you, ' + response.name + '.');
              });
            } else {
              console.log('User cancelled login or did not fully authorize.');
            }
          });
        }
      });
    }*/

    function googleLogin() {
      GoogleLoginService.InitClient();
    }

    function fbLogin() {
      FbLoginService.fbLogin();
    }

    vm.login = login;
    vm.register = register;
    vm.logOut = logOut;
    vm.fbLogin = fbLogin;
    vm.googleLogin = googleLogin;
  }

  LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService', 'UserService', 'FbLoginService', 'GoogleLoginService'];

  angular
    .module('app')
    .controller('LoginController', LoginController);
}());
