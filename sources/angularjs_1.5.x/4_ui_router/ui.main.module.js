angular
    .module('myapp',
        ['ui.router'])

    .config(function ($stateProvider) {

        $stateProvider
            .state({
                name: 'home',
                url: '/home',
                templateUrl: 'sources/angularjs_1.5.x/4_ui_router/ui.main.template.html'
            })
            .state({
                name: 'about',
                url: '/about',
                templateUrl: 'sources/angularjs_1.5.x/4_ui_router/about/about.template.html',
                controller: 'AboutController'
            })
            .state({
                name: 'contact',
                url: '/contact',
                templateUrl: 'sources/angularjs_1.5.x/4_ui_router/contact/contact.template.html',
                controller: 'ContactController'
            })});