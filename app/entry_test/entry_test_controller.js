/**
 * Created by MyPC on 5/6/2016.
 */
(function() {

    function TestController($location, AuthenticationService, FlashService, UserService, FbLoginService) {
        
    }

    TestController.inject = ['$location', 'AuthenticationService', 'FlashService', 'UserService', 'FbLoginService'];
    angular
        .module('app')
        .controller('TestController', TestController);
}());