/**
 * Created by MyPC on 5/6/2016.
 */
(function () {

    function TestController($location, AuthenticationService, FlashService, UserService, FbLoginService, $q, $http, $uibModal, $scope) {
        var timerSeconds = 10000;
        var vm = this;
        vm.isDisableSubmitBtn = false;
        vm.sendTest = sendTest;
        vm.startTest = startTest;
        vm.resetTest = resetTest;
        vm.isDataError = true;
        vm.examinationData = [];
        vm.isShowIntro = true;
        vm.isShowExam = false;
        function GetQuestionData() {
            var deferred = $q.defer();
            $http.get('http://localhost:3521/Api/Examination').
                success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).
                error(function (data, status, headers, config) {
                    deferred.reject(status);
                });
            return deferred.promise;
        }

        GetQuestionData().then(function (data) {
            vm.examinationData = data;
            vm.isDataError = false;
        });

        function startTest() {
            $('.timer').countdown(new Date().getTime() + timerSeconds)
                .on('update.countdown', function (event) {
                    var $this = $(this);
                    $this.html(event.strftime('<span>%H:%M:%S</span>'));
                })
                .on('finish.countdown', function (event) {
                    sendTest();
                    $scope.$apply();
                });
            vm.isShowIntro = false;
            vm.isShowExam = true;
        }

        function sendTest() {
            $('.timer').countdown('stop');
            vm.isDisableSubmitBtn = true;
            var data = vm.examinationData,
                correctedAnswer = 0,
                totalAnswer = 0,
                countAnswer = 0,
                currentQuestion;
            for (var countData = 0, length = data.length; countData < length; countData++) {
                if (data[countData].MySelf === 'question') {
                    totalAnswer++;
                    currentQuestion = data[countData];
                    for (countAnswer = 0; countAnswer < data[countData].answers.length; countAnswer++) {
                        if (currentQuestion.answers[countAnswer].answer.answer_title === currentQuestion.answervalue
                            && currentQuestion.answers[countAnswer].answer.is_correct) {
                            correctedAnswer++;
                            break;
                        }
                    }
                }
            }

            $scope.totalAnswer = totalAnswer;
            $scope.correctedAnswer = correctedAnswer;
            
            $('#result-modal').modal({
                show: 'false'
            });

        }

        function resetTest() {
            vm.isDisableSubmitBtn = false;
            for (var countData = 0, length = vm.examinationData.length; countData < length; countData++) {
                if (vm.examinationData[countData].MySelf === 'question') {
                    if (vm.examinationData[countData].answervalue) {
                        vm.examinationData[countData].answervalue = null;
                    }
                }
            }
            $scope.correctedAnswer = 0;
            $('.index-question-block').find('li').each(function () {
                $(this).css({ 'background': 'white' });
            });
            $('.timer').countdown(new Date().getTime() + timerSeconds)
                .on('update.countdown', function (event) {
                    var $this = $(this);
                    $this.html(event.strftime('<span>%H:%M:%S</span>'));
                })
                .on('finish.countdown', function (event) {
                    sendTest();
                });
        }
    }

    TestController.inject = ['$location', 'AuthenticationService', 'FlashService', 'UserService', 'FbLoginService', '$q', '$http', '$uibModal', '$scope'];

    var app = angular.module('app');
    app.controller('TestController', TestController);
} ());