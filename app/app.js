(function() {
  'use strict';

  angular
    .module('app', ['ngRoute', 'ngCookies', 'password-verify','ui.bootstrap', 'ngAnimate' ])
    .config(config);
  /*  .run(run);*/
    /*window.fbAsyncInit = function() {
        FB.init({
            appId      : '270946653240452',
            cookie     : true,  // enable cookies to allow the server to access
                                // the session
            xfbml      : true,  // parse social plugins on this page
            version    : 'v2.6' // use graph api version 2.6
        });

        // Now that we've initialized the JavaScript SDK, we call
        // FB.getLoginStatus().  This function gets the state of the
        // person visiting this page and can return one of three states to
        // the callback you provide.  They can be:
        //
        // 1. Logged into your app ('connected')
        // 2. Logged into Facebook, but not your app ('not_authorized')
        // 3. Not logged into Facebook and can't tell if they are logged into
        //    your app or not.
        //
        // These three cases are handled in the callback function.
    };

    // Load the SDK asynchronously
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));*/


  config.$inject = ['$routeProvider', '$locationProvider', '$httpProvider', '$httpProvider'];

  function config($routeProvider, $locationProvider) {

    $routeProvider
      .when('/home', {
        controller: 'HomeController',
        templateUrl: 'home/home.html',
        controllerAs: 'vm'
      })
      .when('/login', {
        controller: 'LoginController',
        templateUrl: 'login/login.html',
        controllerAs: 'vm'
      })
      .when('/test', {
        controller: 'TestController',
        templateUrl: 'entry_test/entryTest.html',
        controllerAs: 'vm'
      })
      .when('/', { redirectTo: '/home' });
  }

    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
    function run($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, toState, toParams) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/test']) !== -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                //$location.path('/login');
                event.preventDefault();
                $('#loginmodal').modal('show');
            }
        });
    }
})();
