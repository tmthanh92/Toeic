/**
 * Created by MyPC on 5/6/2016.
 */
(function () {

    function TestController($location, AuthenticationService, FlashService, UserService, FbLoginService) {
        $('.timer').startTimer();

        $('.index-question-block').find('li').on('click', function () {
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
        });
    }

    TestController.inject = ['$location', 'AuthenticationService', 'FlashService', 'UserService', 'FbLoginService'];
    angular
        .module('app')
        .controller('TestController', TestController);
} ());