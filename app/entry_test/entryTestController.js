/**
 * Created by MyPC on 5/6/2016.
 */
(function () {

    function TestController($scope, $location, AuthenticationService, FlashService, UserService, FbLoginService, $q, $http, $uibModal) {

        var vm = this;
        vm.countquestion = 0;
        vm.sendTest = sendTest;

        vm.examinationData = [];
        
        $scope.increaseIndexQuestion = function(){
            vm.countquestion = vm.countquestion + 1;
        }
        
        function GetQuestionData() {
            var deferred = $q.defer();
            $http.get('http://localhost:3521/Api/Examination').
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
            //console.log(vm.test.answerValue);
        }
        
        $('.timer').startTimer();

        
        $('.wrapper-test-content').on('click', 'input[type="radio"]', function () {
            var name = $(this).closest('.question-block').attr('id');
            var id = '';
            if (name) {
                id = name.split('q').length > 1 ? name.split('q')[1] : '';
                if (!isNaN(parseInt(id))) {
                    var itemsQuestion = $('.index-question-block').find('li');
                    itemsQuestion.filter(function () {
                        if ($(this).data('question-target') == id) {
                            $(this).css({ 'background': '#6CA54C' });
                        }
                    });
                }
            }
        });
        $('.index-question-block').on('click', 'li', function () {
            var number = $(this).data('question-target');
            var questionElm = $("#q" + number);
            if (questionElm.length) {
                $('html, body').animate({
                    scrollTop: questionElm.offset().top - 55
                }, 500);
            }
        });
    }

    TestController.inject = ['$scope','$location', 'AuthenticationService', 'FlashService', 'UserService', 'FbLoginService', '$q', '$http', '$uibModal'];

    var app = angular.module('app');
    app.controller('TestController', TestController);
} ());