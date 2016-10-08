angular.module('version2', ['shared'])
    .config(function ($stateProvider) {
        $stateProvider
            .state({
                name: 'main.version2',
                url: '/version2',
                templateUrl: 'sources/angularjs_2.x/version2.template.html',
                controller:'Version2Controller'
            })});