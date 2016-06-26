(function () {
    'use strict';
    var app = angular.module('entry-test', []);

    app.directive("startTest", function () {
        return {
            restrict: 'A',
            scope: false,
            link: function (scope, element, attrs, ctrl) {
                element.bind('click', function (e) {
                    $('.timer').countdown(new Date().getTime() + 10000000)
                        .on('update.countdown', function (event) {
                            var $this = $(this);
                            $this.html(event.strftime('<span>%H:%M:%S</span>'));
                        })
                        .on('finish.countdown', function (event) {
                            scope.timeOutTest();
                        });
                    scope.isShowIntro = false;
                    scope.isShowExam = true;
                    scope.$apply();
                });
            }
        };
    });

    app.directive("scrolltoQuestions", function () {
        return {
            restrict: 'A',
            scope: false,
            link: function (scope, element, attrs, ctrl) {
                $(element).on('click', 'li', function () {
                    var number = $(this).data('question-target');
                    var questionElm = $("#q" + number);
                    if (questionElm.length) {
                        $('html, body').animate({
                            scrollTop: questionElm.offset().top - 55
                        }, 500);
                    }
                });
            }
        };
    });

    app.directive("selectedAnswers", function () {
        return {
            restrict: 'A',
            scope: false,
            link: function (scope, element, attrs, ctrl) {
                $(element).on('click', 'input[type="radio"]', function () {
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
            }
        };
    });


    app.directive("validateSubmit", function () {
        return {
            restrict: 'A',
            scope: false,
            link: function (scope, element, attrs, ctrl) {
                $(element).on('submit', function () {
                    var emptyCount = 0;
                    var indexQuestions = $('.index-question-block').find('li');
                    $('.question-block').each(function () {
                        var found = false;
                        var idAttr = $(this).attr('id');
                        var id = idAttr.split('q').length > 1 ? idAttr.split('q')[1] : '';
                        $(this).find('input[type=radio]').each(function () {
                            if ($(this).prop('checked')) {
                                found = true;
                                return;
                            }
                        });
                        if (!found) {
                            emptyCount++;
                            if (!isNaN(parseInt(id))) {
                                indexQuestions.filter(function () {
                                    if ($(this).data('question-target') == id) {
                                        $(this).css({ 'background': '#FDB53F' });
                                    }
                                });
                            }
                        }
                    });
                    if (emptyCount > 0) {
                        return false;
                    }
                    return true;
                });
            }
        };
    });
})();

