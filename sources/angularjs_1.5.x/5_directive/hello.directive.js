angular
    .module('myapp')
    .directive('helloWorld', HelloWorldDirective);

HelloWorldDirective.$inject = [ '$compile'];

function HelloWorldDirective($compile) {



}