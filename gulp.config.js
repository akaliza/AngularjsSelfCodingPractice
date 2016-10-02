module.exports = function () {

    return {
        libs: [
            'node_modules/underscore/underscore-min.js',
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/bootstrap/dist/js/bootstrap.min.js',
            'node_modules/angular/angular.min.js',
            'node_modules/angular-ui-router/release/angular-ui-router.min.js',
            'node_modules/angular-translate/dist/angular-translate.min.js',
            'node_modules/angular-messages/angular-messages.min.js'
        ],
        jsFileOrder: [
            '**/libs.js',
            '**/**.static.js',
            '**/*.app.js',
            '**/**/*.module.js',
            '**/**.values.js',
            '**/*.js'
        ],
        index: 'index.html',
        js: ['assets/libs.js','sources/**/*.js']
    }


};