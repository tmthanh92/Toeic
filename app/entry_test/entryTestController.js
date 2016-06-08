/**
 * Created by MyPC on 5/6/2016.
 */
(function () {

    function TestController($location, AuthenticationService, FlashService, UserService, FbLoginService, $q, $http, $uibModal, $scope) {

        var vm = this;
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
            $('.timer').startTimer();
            vm.isShowIntro = false;
            vm.isShowExam = true;
        }

        function sendTest() {
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

        function resetTest(){
             for (var countData = 0, length = vm.examinationData.length; countData < length; countData++) {
                if (vm.examinationData[countData].MySelf === 'question') {
                    if(vm.examinationData[countData].answervalue){
                        vm.examinationData[countData].answervalue = null;
                    }
                }
            }
            $('.index-question-block').find('li').each(function(){
                $(this).css({ 'background': 'white' });
            })
            $('.timer').startTimer();
        }

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

    TestController.inject = ['$location', 'AuthenticationService', 'FlashService', 'UserService', 'FbLoginService', '$q', '$http', '$uibModal', '$scope'];

    var app = angular.module('app');
    app.controller('TestController', TestController);
} ());