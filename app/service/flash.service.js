﻿(function () {
    'use strict';

    function FlashService($rootScope) {
        var service = {};

        function Success(message, keepAfterLocationChange) {
            $rootScope.flash = {
                message: message,
                type: 'success',
                keepAfterLocationChange: keepAfterLocationChange
            };
        }

        function Error(message, keepAfterLocationChange) {
            $rootScope.flash = {
                message: message,
                type: 'error',
                keepAfterLocationChange: keepAfterLocationChange
            };
        }

        function initService() {
            function clearFlashMessage() {
                var flash = $rootScope.flash;
                if (flash) {
                    if (!flash.keepAfterLocationChange) {
                        delete $rootScope.flash;
                    } else {
                        // only keep for a single location change
                        flash.keepAfterLocationChange = false;
                    }
                }
            }

            $rootScope.$on('$locationChangeStart', function () {
                clearFlashMessage();
            });
        }

        service.Success = Success;
        service.Error = Error;

        initService();

        return service;
    }
    FlashService.$inject = ['$rootScope'];

    angular
        .module('app')
        .factory('FlashService', FlashService);
}());