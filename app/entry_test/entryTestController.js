/**
 * Created by MyPC on 5/6/2016.
 */
(function () {

    function TestController($location, AuthenticationService, FlashService, UserService, FbLoginService, $q, $http, $uibModal, $scope, $confirm) {
        var vm = this;
        vm.isDisableSubmitBtn = false;
        vm.sendGuestContact = sendGuestContact;
        vm.isDataError = true;
        vm.examinationData = [];
        vm.confirmSubmitTest = confirmSubmitTest;
        $scope.isShowIntro = true;
        $scope.isShowExam = false;
        $scope.timeOutTest = timeOutTest;

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
        function confirmSubmitTest() {
            $confirm({
                text: 'Bạn chưa hoàn thành bài thi. Nếu tiếp tục nộp bài những câu chưa hoàn thành sẽ không được tính điểm.',
                title: '',
                ok: 'Tiếp tục',
                cancel: 'Đóng'
            }).then(function () {
                $('#entry-test-frm').find('input[type="radio"]').attr('disabled', true);
                checkExam();
                $('#result-modal').modal({
                    show: 'false'
                });
                angular.forEach($scope.contactform.$error.required, function (field) {
                    switch (field.$name) {
                        case 'name':
                            field.$viewValue = vm.temp.FullName ? vm.temp.FullName : undefined;
                            break;
                        case 'phone':
                            field.$viewValue = vm.temp.PhoneNumber ? vm.temp.PhoneNumber : undefined;
                            break;
                        case 'email':
                            field.$viewValue = vm.temp.Email ? vm.temp.Email : undefined;
                            break;
                    }
                });
            }, function () {

            });
        }
        function timeOutTest() {
            $('#entry-test-frm').find('input[type="radio"]').attr('disabled', true);
            $confirm({ 
                text: 'Bạn đã hết thời gian làm bài.', 
                title: '',
                ok: 'Tiếp tục',
                cancel: 'Đóng' 
            }).then(function () {
                    checkExam();
                    $('#result-modal').modal({
                        show: 'false'
                    });
                    angular.forEach($scope.contactform.$error.required, function (field) {
                        switch (field.$name) {
                            case 'name':
                                field.$viewValue = vm.temp.FullName ? vm.temp.FullName : undefined;
                                break;
                            case 'phone':
                                field.$viewValue = vm.temp.PhoneNumber ? vm.temp.PhoneNumber : undefined;
                                break;
                            case 'email':
                                field.$viewValue = vm.temp.Email ? vm.temp.Email : undefined;
                                break;
                        }
                    });
                });
        }


        function checkExam() {
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
        }
        function sendGuestContact() {
            vm.guest.ExaminationId = 1;
            vm.guest.CorrectAnswerNum = $scope.correctedAnswer;
            $http.post('http://localhost:3521/api/guest/submit_test', vm.guest, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        // function resetTest() {
        //     vm.isDisableSubmitBtn = false;
        //     for (var countData = 0, length = vm.examinationData.length; countData < length; countData++) {
        //         if (vm.examinationData[countData].MySelf === 'question') {
        //             if (vm.examinationData[countData].answervalue) {
        //                 vm.examinationData[countData].answervalue = null;
        //             }
        //         }
        //     }
        //     $scope.correctedAnswer = 0;
        //     $('.index-question-block').find('li').each(function () {
        //         $(this).css({ 'background': 'white' });
        //     });
        //     $('.timer').countdown(new Date().getTime() + timerSeconds)
        //         .on('update.countdown', function (event) {
        //             var $this = $(this);
        //             $this.html(event.strftime('<span>%H:%M:%S</span>'));
        //         })
        //         .on('finish.countdown', function (event) {
        //             sendTest();
        //         });
        // }
    }

    TestController.inject = ['$location', 'AuthenticationService', 'FlashService', 'UserService', 'FbLoginService', '$q', '$http', '$uibModal', '$scope', '$confirm'];

    var app = angular.module('app');
    app.controller('TestController', TestController);
} ());