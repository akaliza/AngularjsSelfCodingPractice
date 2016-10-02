angular.module('myapp')
    .controller('ContactController', ContactController);

ContactController.$inject = ['$scope'];

function ContactController($scope) {
    console.log('ContactController initialized...');


}
