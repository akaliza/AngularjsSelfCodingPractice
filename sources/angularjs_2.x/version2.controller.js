angular.module('version2')
    .controller('Version2Controller', Version2Controller);

Version1Controller.$inject = ['$scope'];

function Version2Controller($scope) {

    console.log('Version2Controller...');

}