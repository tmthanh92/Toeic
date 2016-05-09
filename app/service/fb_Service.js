/**
 * Created by MyPC on 5/3/2016.
 */
/** Facebook Login JavaScript SDK*/
(function() {
    function FbLoginService($location) {
        var service = {};
        function FacebookInit() {
            window.fbAsyncInit = function() {
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
        }
        FacebookInit();

        // Load the SDK asynchronously
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
           /* js.src = "//connect.facebook.net/en_US/sdk.js";*/
            js.src = "js/fb_api.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        service.fbLogin = FacebookLogin;
        return service;


        function FacebookLogin() {
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
                    $('#loginmodal').modal('hide');
                    $location.path('/home');
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
                            $('#loginmodal').modal('hide');
                            $location.path('/home');
                        } else {
                            console.log('User cancelled login or did not fully authorize.');
                        }
                    }, {
                        scope: 'public_profile, email, publish_actions',
                        return_scopes: true
                    });
                }
            });
        }

    }
    FbLoginService.inject = ['$location'];
    angular
        .module('app')
        .factory('FbLoginService', FbLoginService)
}());