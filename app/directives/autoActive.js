window.location.hash = '#/'; //All hash paths need to start with a /, it happens automaticaly with ngResource and the like...

//the module we are demonstrating:
(function () {
    angular.module('auto-active', [])
        .directive('autoActive', ['$location', function ($location) {
            return {
                restrict: 'A',
                scope: false,
                link: function (scope, element) {
                    function setActive() {
                        var path = $location.path();
                        if (path) {
                            angular.forEach(element.find('li'), function (li) {
                                var anchor = li.querySelector('a');
                                if (anchor) {
                                    if (anchor.href.match('#' + path + '(?=\\?|$)')) {
                                        angular.element(li).addClass('active');
                                    } else {
                                        angular.element(li).removeClass('active');
                                    }
                                }

                            });
                        }
                    }

                    setActive();

                    scope.$on('$locationChangeSuccess', setActive);
                }
            }
        }]);
} ());