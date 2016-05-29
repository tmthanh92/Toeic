/**
 * Created by MyPC on 5/6/2016.
 */
(function () {

    function TestController($location, AuthenticationService, FlashService, UserService, FbLoginService, $q, $http, $uibModal) {

        var vm = this;
        vm.sendTest = sendTest;

        vm.examinationData = [];

        function GetQuestionData() {
            var deferred = $q.defer();
            $http.get('http://localhost/SeeEnglish/Api/Examination').
            success(function(data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function(data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        GetQuestionData().then(function(data) {
                vm.examinationData = data;

        },
        function() {
            alert('Error when loading data');
        })

    
        function sendTest() {
            console.log(vm.test.answerValue);
        }
        
        $('.timer').startTimer();

       /* $('.index-question-block').find('li').on('click', function () {
            var number = $(this).text();
            var questionElm = $("#q" + number);
            if (questionElm.length) {
                $('html, body').animate({
                    scrollTop: questionElm.offset().top - 55
                }, 500);
            }
        });

        var itemsQuestion = $('.index-question-block').find('li');
        $('.wrapper-test-content').find('input[type="radio"]').on('click', function () {
            var name = $(this).closest('.question-block').attr('id');
            var id = '';
            if (name) {
                id = name.split('q').length > 1 ? name.split('q')[1] : '';
                if (!isNaN(parseInt(id))) {
                    itemsQuestion.filter(function () {
                        if ($(this).text() === id) {
                            $(this).css({ 'background': '#6CA54C' });
                        }
                    });
                }
            }
        });*/
        $('.index-question-block').on('click', 'li', function () {
            var number = $(this).text();
            var questionElm = $("#q" + number);
            if (questionElm.length) {
                $('html, body').animate({
                    scrollTop: questionElm.offset().top - 55
                }, 500);
            }
        });
    }

    TestController.inject = ['$location', 'AuthenticationService', 'FlashService', 'UserService', 'FbLoginService', '$q', '$http', '$uibModal'];

    var app = angular.module('app');
    app.controller('TestController', TestController);
} ());