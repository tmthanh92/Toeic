/**
 * Created by MyPC on 5/3/2016.
 */
/** Google Login Javascript SDK .....*/
(function(){
    'use strict'

   /* function googleLoginService() {
        var service = {};
        var auth2;


        function initClient() {

            gapi.load('auth2', function(){
                /!**
                 * Retrieve the singleton for the GoogleAuth library and set up the
                 * client.
                 *!/
                auth2 = gapi.auth2.init({
                    client_id: '151431349905-7rsogqsqrgf0793jucoj90rjk0q8hpg4.apps.googleusercontent.com'
                });

                // Attach the click handler to the sign-in button
                auth2.attachClickHandler('customBtn', {}, onSuccess, onFailure);

            });
        }
        initClient();

        // Load the SDK asynchronously
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "https://apis.google.com/js/api:client.js?onload=onLoadCallback";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'google-jssdk'));

        return service;


        function onSuccess(user) {
            console.log('Signed in as ' + user.getBasicProfile().getName());
            console.log('Signed in as ' + user.getBasicProfile().getGivenName());
            console.log('Signed in as ' + user.getBasicProfile().getFamilyName());
            console.log('Signed in as ' + user.getBasicProfile().getImageUrl());
            console.log('Signed in as ' + user.getBasicProfile().getEmail());
        }

        function onFailure(error) {
            console.log(error);
        }
    }*/
    /*angular
        .module('app')
        .factory('GoogleLoginService', googleLoginService)*/

}());