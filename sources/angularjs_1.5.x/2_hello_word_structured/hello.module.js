angular.module('myapp2', [])
    .config(function ($stateProvider) {
        $stateProvider
            .state({
                name: 'exo2',
                url: '/exo2',
                templateUrl: 'sources/angularjs_1.5.x/2_hello_word_structured/index.html',
                controller:'HelloController'
            })});