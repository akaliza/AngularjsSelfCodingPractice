

angular
    .module('myapp',
        ['ui.router'])

    .config(function ($stateProvider, $translateProvider) {

        $stateProvider
            .state({
                name: 'myapp.home',
                url: '/index',
                templateUrl: 'sources/4_ui_router/index.html'
            })
            .state({
                name: 'myapp.about',
                url: '/about',
                templateUrl: 'sources/4_ui_router/about.template.html',
                controller: 'HelloController'
            })
            .state({
                name: 'main.about',
                url: '/myapp.contact',
                templateUrl: 'sources/4_ui_router/contact.template.html',
                controller: 'HelloController'
            })

    });