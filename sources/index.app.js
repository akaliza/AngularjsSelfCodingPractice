var app = angular.module('main', [
    'ui.router',
    'ngMessages',
    'pascalprecht.translate',
    'shared',
    'version1',
    'version2'
]);

app.config(function($stateProvider, $urlRouterProvider, $translateProvider) {
    $stateProvider
        .state({
            abstract: true,
            name: 'main',
            url: '?:language',
            templateUrl: 'sources/main.template.html',
            controller: 'MainController'
        });

    $urlRouterProvider.otherwise("/version1");

    $translateProvider.translations('en', locale_en);

    $translateProvider.translations('ro', locale_ro);
    $translateProvider.preferredLanguage('en');
});