angular.module('myapp')
    .controller('HelloController', HelloController);

HelloController.$inject = ['$scope'];

function HelloController($scope) {
    console.log('HelloController initialized...');
}
