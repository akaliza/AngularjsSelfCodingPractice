angular.module('myapp')
    .controller('AboutController', AboutController);

AboutController.$inject = ['$scope'];

function AboutController($scope) {
    console.log('AboutController initialized...');
}
