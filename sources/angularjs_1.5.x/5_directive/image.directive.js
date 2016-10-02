angular.module('myapp')
    .directive('img', ImageDirective)

ImageDirective.$inject = [];

function ImageDirective() {
    return {
        restrict: 'E', // the directive is restricted to element
        link: function($scope, elem) {
            elem.attr('style', 'width: 50px; height: 50px; border-radius: 50%;')
        }
    }
}