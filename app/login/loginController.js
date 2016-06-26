/**
 * Created by MyPC on 4/22/2016.
 */
(function() {
  'use strict';

  function LoginController($rootScope,$cookieStore,$window,$location, AuthenticationService, FlashService, UserService, FbLoginService, GoogleLoginService) {
    var vm = this;
    vm.isValidAccount = false;
    vm.isLoggingIn = false;
    vm.loggedUser = "";
    vm.isLogginSubmit = false;
    vm.isRegSubmit = false;
    vm.existedEmail = false;
    var existedUser = $cookieStore.get('globals');
    if(existedUser !== null && existedUser!== undefined)
    {
      if(existedUser.currentUser !== null && existedUser.currentUser !== undefined)
      {
        if(existedUser.currentUser.username !== null && existedUser.currentUser.username !== undefined)
        {
          vm.loggedUser = existedUser.currentUser.username;
          vm.isLoggingIn = true;
        }
      }
    }
    function login() {

      vm.dataLoading = true;
      AuthenticationService.Login(vm.username, vm.password, function(response) {
        if (response.success)
        {
          AuthenticationService.SetCredentials(vm.username, vm.password);
          vm.isLoggingIn = true;
          vm.loggedUser = vm.username;
          $('#loginmodal').modal('hide');
          //$location.path('/login');
          $window.location.href = '/Toeic/app/index.html';
          //alert('Dang nhap thanh cong');
        } else
        {
        /*  FlashService.Error(response.message);
          vm.dataLoading = false;*/
          vm.isValidAccount = true;
          vm.isLoggingIn = false;
          AuthenticationService.ClearCredentials();
        }
      });
    }

    function register() {
      vm.dataLoading = true;
      UserService.Create(vm.user)
        .then(function(response) {
          if (response.isLogged) {
            if(response.email !== null && response.email !== '')
            {
              //FlashService.Success('Registration successful', true);
              AuthenticationService.SetCredentials(response.email, response.password);
              vm.isLoggingIn = true;
              vm.loggedUser = response.username;
              $('#loginmodal').modal('hide');
              $window.location.href = '/Toeic/app/index.html';
              //$location.path('/login');
            }
            else {
              //FlashService.Error(response);
              vm.existedEmail = true;
              vm.dataLoading = false;
            }
          } else {
            //FlashService.Error(response);
            vm.existedEmail = true;
            vm.dataLoading = false;
          }
        });
    }

    function logOut() {
      vm.isLoggingIn = false;
      AuthenticationService.ClearCredentials();
      $window.location.href = '/Toeic/app/index.html';
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

       FbLoginService.fbLogin().then(function(data) {
        vm.isLoggingIn = true;
        vm.loggedUser = data.name;
         AuthenticationService.SetCredentials(data.name, response.password);
         $('#loginmodal').modal('hide');
       /*  $location.path('/home');*/
       });
    }

    vm.login = login;
    vm.register = register;
    vm.logOut = logOut;
    vm.fbLogin = fbLogin;
    vm.googleLogin = googleLogin;
  }

  LoginController.$inject = ['$rootScope','$cookieStore','$window','$location', 'AuthenticationService', 'FlashService', 'UserService', 'FbLoginService', 'GoogleLoginService'];

  angular
    .module('app')
    .controller('LoginController', LoginController);
}());
