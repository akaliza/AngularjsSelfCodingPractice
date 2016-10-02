var app = angular.module('main', [
    'ui.router',
    'version1'
]);

app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state({
            abstract: true,
            name: 'main',
            templateUrl: 'sources/main.template.html',
            controller: 'MainController'
        });

    $urlRouterProvider.otherwise("/version1");


});