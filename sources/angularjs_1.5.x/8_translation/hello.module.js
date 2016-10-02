angular
    .module('myapp',
        ['ui.router', 'pascalprecht.translate'])

    .config(function ($stateProvider, $translateProvider) {

        $translateProvider.translations('en', '');
        $stateProvider
            .state({
                name: 'myapp.home',
                url: '/home',
                templateUrl: 'sources/angularjs_1.5.x/4_ui_router/ui.router.main.template.html'
            })
            .state({
                name: 'myapp.about',
                url: '/about',
                templateUrl: 'sources/angularjs_1.5.x/4_ui_router/about.template.html',
                controller: 'HelloController'
            })
            .state({
                name: 'myapp.contact',
                url: '/contact',
                templateUrl: 'sources/angularjs_1.5.x/4_ui_router/contact.template.html',
                controller: 'HelloController'
            })


    });