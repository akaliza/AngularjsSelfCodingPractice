angular.module('version1', [])
    .config(function ($stateProvider) {
            $stateProvider
                .state({
                        name: 'main.version1',
                        url: '/version1',
                        templateUrl: 'sources/angularjs_1.5.x/version1.template.html',
                        controller:'Version1Controller'
                })});